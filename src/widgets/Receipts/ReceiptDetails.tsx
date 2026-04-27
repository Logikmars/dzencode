'use client';

import Text from '@/shared/Text/Text';
import type { Receipt, ReceiptProduct } from '@/lib/receipts';
import { ReceiptProductRow } from '@/widgets/Receipts/ReceiptProductRow';
import { useTranslation } from 'react-i18next';
import { getStatusTranslationKey } from '@/i18n/helpers';

type ReceiptDetailsProps = {
  receipt: Receipt;
  filteredProducts: ReceiptProduct[];
  statusFilter: string;
  specificationFilter: string;
  statusOptions: string[];
  specificationOptions: string[];
  deletingProductId: number | null;
  onClose: () => void;
  onProductDeleteClick: (product: ReceiptProduct) => void;
  onStatusFilterChange: (value: string) => void;
  onSpecificationFilterChange: (value: string) => void;
};

export function ReceiptDetails({
  receipt,
  filteredProducts,
  statusFilter,
  specificationFilter,
  statusOptions,
  specificationOptions,
  deletingProductId,
  onClose,
  onProductDeleteClick,
  onStatusFilterChange,
  onSpecificationFilterChange,
}: ReceiptDetailsProps) {
  const { t } = useTranslation();

  return (
    <section className='ReceiptDetails'>
      <div className='ReceiptDetails_header'>
        <div className='ReceiptDetails_headerMain'>
          <button className='ReceiptDetails_backButton' type='button' onClick={onClose}>
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M15 6l-6 6 6 6' />
            </svg>
            <Text text={t('receipts.backToReceipts')} fs_14 fw_l />
          </button>

          <Text text={t('receipts.productsTitle', { count: receipt.count })} h1 />
        </div>

        <div className='ReceiptDetails_filters'>
          <label className='ReceiptDetails_filter'>
            <Text text={t('receipts.type')} ghost fs_12 fw_l />
            <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
              <option value='all'>{t('receipts.all')}</option>
              {statusOptions.map((status) => (
                <option value={status} key={status}>
                  {t(getStatusTranslationKey(status) || status)}
                </option>
              ))}
            </select>
          </label>

          <label className='ReceiptDetails_filter'>
            <Text text={t('receipts.specification')} ghost fs_12 fw_l />
            <select
              value={specificationFilter}
              onChange={(event) => onSpecificationFilterChange(event.target.value)}
            >
              <option value='all'>{t('receipts.all')}</option>
              {specificationOptions.map((specification) => (
                <option value={specification} key={specification}>
                  {specification}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className='ReceiptDetails_table'>
        {filteredProducts.map((product) => (
          <ReceiptProductRow
            key={product.id}
            product={product}
            onDeleteClick={onProductDeleteClick}
            isDeleting={deletingProductId === product.id}
          />
        ))}

        {filteredProducts.length === 0 ? (
          <div className='ReceiptDetails_empty'>
            <Text text={t('receipts.emptyByFilters')} ghost />
          </div>
        ) : null}
      </div>
    </section>
  );
}
