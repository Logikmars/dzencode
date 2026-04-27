'use client';

import Text from '@/shared/Text/Text';
import type { ReceiptProduct } from '@/lib/receipts';
import { useTranslation } from 'react-i18next';
import { getStatusTranslationKey } from '@/i18n/helpers';

type ReceiptProductRowProps = {
  product: ReceiptProduct;
  onDeleteClick: (product: ReceiptProduct) => void;
  isDeleting: boolean;
};

export function ReceiptProductRow({ product, onDeleteClick, isDeleting }: ReceiptProductRowProps) {
  const { t } = useTranslation();
  const statusKey = getStatusTranslationKey(product.status);
  const isFree = statusKey === 'receipts.status.free';

  return (
    <article className='ReceiptDetails_row'>
      <div className='ReceiptDetails_device'>
        <div
          className={`ReceiptDetails_statusDot ${isFree ? 'ReceiptDetails_statusDot--free' : ''}`}
          aria-hidden='true'
        />

        <div className='ReceiptDetails_deviceIcon' aria-hidden='true'>
          <svg viewBox='0 0 24 24'>
            <path d='M4 6h16v10H4zM9 18h6M12 16v2' />
          </svg>
        </div>

        <div className='ReceiptDetails_deviceInfo'>
          <Text text={product.title} fs_14 />
          <Text text={product.serialNum} fs_10 ghost />
        </div>
      </div>

      <div className='ReceiptDetails_status'>
        <Text
          text={statusKey ? t(statusKey) : product.status}
          fs_12
          fw_l
          green={isFree}
          className='ReceiptDetails_statusText'
        />
      </div>

      <div className='ReceiptDetails_dates'>
        <Text text={t('receipts.from', { date: product.receiptDate })} fs_10 ghost />
        <Text text={t('receipts.to', { date: product.guarantee })} fs_10 ghost />
      </div>

      <div className='ReceiptDetails_price'>
        <Text text={product.priceTop} fs_10 ghost />
        <Text text={product.priceBottom} fs_10 ghost />
      </div>

      <div className='ReceiptDetails_group'>
        <Text text={product.group} fs_14 />
      </div>

      <div className='ReceiptDetails_seller'>
        <Text text={product.seller} fs_14 />
      </div>

      <div className='ReceiptDetails_owner'>
        <Text text={product.owner} fs_14 />
      </div>

      <div className='ReceiptDetails_arrival'>
        <Text text={t('receipts.arrivalFrom', { date: product.arrivalDate })} fs_10 ghost />
      </div>

      <button
        className='ReceiptDetails_more'
        type='button'
        aria-label={t('receipts.deleteProduct')}
        title={t('receipts.deleteProduct')}
        onClick={() => onDeleteClick(product)}
        disabled={isDeleting}
      >
        <svg viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M9 9v7M12 9v7M15 9v7M7 6h10M9 6V4h6v2M8 6l.5 11h7L16 6' />
        </svg>
      </button>
    </article>
  );
}
