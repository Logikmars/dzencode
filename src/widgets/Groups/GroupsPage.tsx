'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Receipt } from '@/lib/receipts';
import Text from '@/shared/Text/Text';
import { ReceiptList } from '@/widgets/Receipts/ReceiptList';
import { useTranslation } from 'react-i18next';
import { getStatusTranslationKey } from '@/i18n/helpers';

type GroupsPageProps = {
  receipts: Receipt[];
};

export default function GroupsPage({ receipts }: GroupsPageProps) {
  const { t } = useTranslation();
  const [selectedReceiptId, setSelectedReceiptId] = useState<number | null>(receipts[0]?.id ?? null);
  const [isClosingPanel, setIsClosingPanel] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedReceipt = useMemo(
    () => receipts.find((receipt) => receipt.id === selectedReceiptId) ?? null,
    [receipts, selectedReceiptId],
  );

  const openReceipt = (receipt: Receipt) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      setIsClosingPanel(false);
    }

    setSelectedReceiptId(receipt.id);
  };

  const closeReceipt = () => {
    setIsClosingPanel(true);
    closeTimerRef.current = setTimeout(() => {
      setSelectedReceiptId(null);
      setIsClosingPanel(false);
      closeTimerRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <main className='page Group'>
      <div className='Group_header'>
        <button className='Main_addButton' type='button' aria-label={t('groups.addGroup')}>
          <svg viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M12 7v10M7 12h10' />
          </svg>
        </button>
        <Text text={t('receipts.listTitle', { count: receipts.length })} h1 />
      </div>

      <div className='Group_layout'>
        <div className='Group_sidebar'>
          <ReceiptList
            receipts={receipts}
            onReceiptOpen={openReceipt}
            onReceiptDelete={() => undefined}
            deletingReceiptId={null}
            canDelete={false}
            small
            hideHeader
            showDeleteButton={false}
          />
        </div>

        <section className='Group_panel'>
          {selectedReceipt ? (
            <div className={`Group_panelContent${isClosingPanel ? ' Group_panelContent--leave' : ' Group_panelContent--enter'}`}>
              <button className='Group_closeButton' type='button' onClick={closeReceipt} aria-label={t('groups.close')}>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8 8l8 8M16 8l-8 8' />
                </svg>
              </button>

              <div className='Group_panelInner' key={selectedReceipt.id}>
                <div className='Group_panelHeader'>
                  <Text text={selectedReceipt.title} className='Group_panelTitle' />
                  <button className='Group_addProductButton' type='button'>
                    <span className='Group_addProductIcon' aria-hidden='true'>
                      <svg viewBox='0 0 24 24'>
                        <path d='M12 7v10M7 12h10' />
                      </svg>
                    </span>
                    <Text text={t('groups.addProduct')} fs_12 fw_l />
                  </button>
                </div>

                <div className='Group_products'>
                  {selectedReceipt.products.map((product) => {
                    const statusKey = getStatusTranslationKey(product.status);
                    const isFree = statusKey === 'receipts.status.free';

                    return (
                      <article className='Group_productRow' key={product.id}>
                        <div className={`Group_productDot${isFree ? ' Group_productDot--free' : ''}`} aria-hidden='true' />

                        <div className='Group_productIcon' aria-hidden='true'>
                          <svg viewBox='0 0 24 24'>
                            <path d='M4 6h16v10H4zM9 18h6M12 16v2' />
                          </svg>
                        </div>

                        <div className='Group_productInfo'>
                          <Text text={product.title} fs_14 className='Group_productTitle' />
                          <Text text={product.serialNum} fs_10 ghost />
                        </div>

                        <div className='Group_productStatus'>
                          <Text text={statusKey ? t(statusKey) : product.status} fs_12 fw_l green={isFree} />
                        </div>
                      </article>
                    );
                  })}

                  {selectedReceipt.products.length === 0 ? (
                    <div className='Group_empty'>
                      <Text text={t('groups.emptyReceipt')} ghost />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className='Group_placeholder Group_panelContent Group_panelContent--enter'>
              <Text text={t('groups.selectReceipt')} ghost />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
