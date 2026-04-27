'use client';

import Text from '@/shared/Text/Text';
import type { Receipt } from '@/lib/receipts';
import { ReceiptListItem } from '@/widgets/Receipts/ReceiptListItem';
import { useTranslation } from 'react-i18next';

type ReceiptListProps = {
  receipts: Receipt[];
  onReceiptOpen: (receipt: Receipt) => void;
  onReceiptDelete: (receiptId: number) => void;
  deletingReceiptId: number | null;
  canDelete: boolean;
  small?: boolean;
  hideHeader?: boolean;
  showDeleteButton?: boolean;
};

export function ReceiptList({
  receipts,
  onReceiptOpen,
  onReceiptDelete,
  deletingReceiptId,
  canDelete,
  small = false,
  hideHeader = false,
  showDeleteButton = true,
}: ReceiptListProps) {
  const { t } = useTranslation();

  return (
    <>
      {!hideHeader ? (
        <div className='Main_header'>
          <button className='Main_addButton' type='button' aria-label={t('receipts.addReceipt')}>
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M12 7v10M7 12h10' />
            </svg>
          </button>
          <Text text={t('receipts.listTitle', { count: receipts.length })} h1 />
        </div>
      ) : null}

      <div className='Main_list'>
        {receipts.map((receipt) => (
          <ReceiptListItem
            key={receipt.id}
            receipt={receipt}
            onOpen={onReceiptOpen}
            onDelete={onReceiptDelete}
            isDeleting={deletingReceiptId === receipt.id}
            canDelete={canDelete}
            small={small}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    </>
  );
}
