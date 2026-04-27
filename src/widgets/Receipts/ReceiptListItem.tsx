'use client';

import Text from '@/shared/Text/Text';
import type { Receipt } from '@/lib/receipts';
import { useTranslation } from 'react-i18next';

type ReceiptListItemProps = {
  receipt: Receipt;
  onOpen: (receipt: Receipt) => void;
  onDelete: (receiptId: number) => void;
  isDeleting: boolean;
  canDelete: boolean;
  small?: boolean;
  showDeleteButton?: boolean;
};

export function ReceiptListItem({
  receipt,
  onOpen,
  onDelete,
  isDeleting,
  canDelete,
  small = false,
  showDeleteButton = true,
}: ReceiptListItemProps) {
  const { t } = useTranslation();

  const rowClassName = [
    'Main_row',
    'Main_row--interactive',
    small ? 'Main_row--small' : '',
    !showDeleteButton ? 'Main_row--noActions' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const openButtonClassName = [
    'Main_openButton',
    small ? 'Main_openButton--small' : '',
    !showDeleteButton ? 'Main_openButton--noActions' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={rowClassName}>
      <button className={openButtonClassName} type='button' onClick={() => onOpen(receipt)} disabled={isDeleting}>
        {!small ? <Text text={receipt.title} underline ghost /> : null}

        <div className='Main_meta Main_meta--products'>
          <div className='Main_roundIcon' aria-hidden='true'>
            <svg viewBox='0 0 24 24'>
              <path d='M6 7h12M6 12h12M6 17h12M3.5 7h.01M3.5 12h.01M3.5 17h.01' />
            </svg>
          </div>

          <div className='Main_metaText'>
            <Text text={receipt.count} fw_xl />
          <Text text={t('receipts.productLabel', { count: Number(receipt.count) })} ghost fs_14 />
          </div>
        </div>

        <div className='Main_meta Main_meta--date'>
          <Text text={receipt.month} ghost fs_14 tac />
          <Text text={receipt.date} fw_xl fs_14 ghost tac />
        </div>

        {!small ? (
          <div className='Main_meta Main_meta--amount'>
            <Text text={receipt.amountTop} fw_l fs_14 />
            {receipt.amountBottom ? <Text text={receipt.amountBottom} fs_14 ghost /> : null}
          </div>
        ) : null}
      </button>

      {showDeleteButton ? (
        <button
          className='Main_deleteButton'
          type='button'
          aria-label={t('receipts.deleteReceipt')}
          onClick={() => onDelete(receipt.id)}
          disabled={isDeleting || !canDelete}
          title={canDelete ? t('receipts.deleteReceipt') : t('receipts.fallbackDeleteHint')}
        >
          <svg viewBox='0 0 24 24'>
            <path d='M9 9v7M12 9v7M15 9v7M7 6h10M9 6V4h6v2M8 6l.5 11h7L16 6' />
          </svg>
        </button>
      ) : null}
    </article>
  );
}
