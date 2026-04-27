'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Receipt, ReceiptsResponse } from '@/lib/receipts';
import { DeleteConfirmModal } from '@/shared/DeleteConfirmModal/DeleteConfirmModal';
import { ReceiptDetails } from '@/widgets/Receipts/ReceiptDetails';
import { ReceiptList } from '@/widgets/Receipts/ReceiptList';
import { ReceiptListSkeleton } from '@/widgets/Receipts/ReceiptListSkeleton';
import './Receipts.scss';
import { useTranslation } from 'react-i18next';

type DeleteTarget =
  | { type: 'receipt'; id: number; title: string; subtitle: string }
  | { type: 'product'; id: number; receiptId: number; title: string; subtitle: string };

export default function ReceiptsPage() {
  const { t } = useTranslation();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [canDelete, setCanDelete] = useState(false);
  const [deletingTarget, setDeletingTarget] = useState<{ type: DeleteTarget['type']; id: number } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DeleteTarget | null>(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [specificationFilter, setSpecificationFilter] = useState('all');

  useEffect(() => {
    let isCancelled = false;

    const loadReceipts = async () => {
      try {
        const response = await fetch('/api/receipts', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to load receipts: ${response.status}`);
        }

        const nextReceiptsResponse = (await response.json()) as ReceiptsResponse;

        if (!isCancelled) {
          setReceipts(nextReceiptsResponse.receipts);
          setCanDelete(nextReceiptsResponse.source === 'database');
          setErrorMessage(
            nextReceiptsResponse.source === 'fallback'
              ? t('receipts.fallbackDataWarning')
              : '',
          );
        }
      } catch (error) {
        console.error('Failed to fetch receipts.', error);

        if (!isCancelled) {
          setErrorMessage(t('receipts.failedLoad'));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadReceipts();

    return () => {
      isCancelled = true;
    };
  }, [t]);

  const selectedReceipt = useMemo(
    () => receipts.find((receipt) => receipt.id === selectedReceiptId) ?? null,
    [receipts, selectedReceiptId],
  );

  const openReceipt = (receipt: Receipt) => {
    setStatusFilter('all');
    setSpecificationFilter('all');
    setSelectedReceiptId(receipt.id);
  };

  const closeReceipt = () => {
    setStatusFilter('all');
    setSpecificationFilter('all');
    setSelectedReceiptId(null);
  };

  const requestReceiptDelete = (receiptId: number) => {
    const receipt = receipts.find((item) => item.id === receiptId);

    if (!receipt) {
      return;
    }

    setPendingDelete({
      type: 'receipt',
      id: receipt.id,
      title: t('receipts.deleteReceiptQuestion'),
      subtitle: receipt.title,
    });
  };

  const requestProductDelete = (productId: number, receiptId: number, productTitle: string, serialNum: string) => {
    setPendingDelete({
      type: 'product',
      id: productId,
      receiptId,
      title: t('receipts.deleteProductQuestion'),
      subtitle: `${productTitle} (${serialNum})`,
    });
  };

  const removeReceipt = async (receiptId: number) => {
    if (!canDelete) {
      setErrorMessage(t('receipts.deleteUnavailable'));
      return false;
    }

    setDeletingTarget({ type: 'receipt', id: receiptId });
    setErrorMessage('');

    try {
      const response = await fetch(`/api/receipts/${receiptId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? `Failed to delete receipt: ${response.status}`);
      }

      setReceipts((currentReceipts) =>
        currentReceipts.filter((receipt) => receipt.id !== receiptId),
      );

      if (selectedReceiptId === receiptId) {
        closeReceipt();
      }
      return true;
    } catch (error) {
      console.error('Failed to delete receipt.', error);
      setErrorMessage(error instanceof Error ? error.message : t('receipts.failedDeleteReceipt'));
      return false;
    } finally {
      setDeletingTarget(null);
    }
  };

  const removeProduct = async (productId: number, receiptId: number) => {
    if (!canDelete) {
      setErrorMessage(t('receipts.deleteUnavailable'));
      return false;
    }

    setDeletingTarget({ type: 'product', id: productId });
    setErrorMessage('');

    try {
      const response = await fetch(`/api/receipts/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? `Failed to delete product: ${response.status}`);
      }

      setReceipts((currentReceipts) =>
        currentReceipts.map((receipt) => {
          if (receipt.id !== receiptId) {
            return receipt;
          }

          const nextProducts = receipt.products.filter((product) => product.id !== productId);
          const nextCount = nextProducts.length;

          return {
            ...receipt,
            products: nextProducts,
            count: String(nextCount),
            label: t('receipts.productLabel', { count: nextCount }),
          };
        }),
      );
      return true;
    } catch (error) {
      console.error('Failed to delete product.', error);
      setErrorMessage(error instanceof Error ? error.message : t('receipts.failedDeleteProduct'));
      return false;
    } finally {
      setDeletingTarget(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }

    if (pendingDelete.type === 'receipt') {
      const deleted = await removeReceipt(pendingDelete.id);
      if (deleted) {
        setPendingDelete(null);
      }
      return;
    }

    const deleted = await removeProduct(pendingDelete.id, pendingDelete.receiptId);
    if (deleted) {
      setPendingDelete(null);
    }
  };

  const statusOptions = useMemo(() => {
    if (!selectedReceipt) {
      return [];
    }

    return Array.from(new Set(selectedReceipt.products.map((product) => product.status)));
  }, [selectedReceipt]);

  const specificationOptions = useMemo(() => {
    if (!selectedReceipt) {
      return [];
    }

    return Array.from(new Set(selectedReceipt.products.map((product) => product.specification)));
  }, [selectedReceipt]);

  const filteredProducts = useMemo(() => {
    if (!selectedReceipt) {
      return [];
    }

    return selectedReceipt.products.filter((product) => {
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesSpecification =
        specificationFilter === 'all' || product.specification === specificationFilter;

      return matchesStatus && matchesSpecification;
    });
  }, [selectedReceipt, specificationFilter, statusFilter]);

  if (isLoading) {
    return <ReceiptListSkeleton />;
  }

  return (
    <main className='page Main'>
      {errorMessage ? <p className='Main_errorMessage'>{errorMessage}</p> : null}

      {selectedReceipt ? (
        <ReceiptDetails
          receipt={selectedReceipt}
          filteredProducts={filteredProducts}
          statusFilter={statusFilter}
          specificationFilter={specificationFilter}
          statusOptions={statusOptions}
          specificationOptions={specificationOptions}
          deletingProductId={deletingTarget?.type === 'product' ? deletingTarget.id : null}
          onClose={closeReceipt}
          onProductDeleteClick={(product) =>
            requestProductDelete(product.id, selectedReceipt.id, product.title, product.serialNum)
          }
          onStatusFilterChange={setStatusFilter}
          onSpecificationFilterChange={setSpecificationFilter}
        />
      ) : (
        <ReceiptList
          receipts={receipts}
          onReceiptOpen={openReceipt}
          onReceiptDelete={requestReceiptDelete}
          deletingReceiptId={deletingTarget?.type === 'receipt' ? deletingTarget.id : null}
          canDelete={canDelete}
        />
      )}

      <DeleteConfirmModal
        isOpen={Boolean(pendingDelete)}
        title={pendingDelete?.title ?? ''}
        subtitle={pendingDelete?.subtitle}
        isDeleting={
          pendingDelete ?
            deletingTarget?.type === pendingDelete.type && deletingTarget.id === pendingDelete.id
          : false
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
