'use client';

import Text from '@/shared/Text/Text';
import './DeleteConfirmModal.scss';
import { useTranslation } from 'react-i18next';

type DeleteConfirmModalProps = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({
  isOpen,
  title,
  subtitle,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className='DeleteConfirmModal' role='presentation' onClick={onCancel}>
      <div
        className='DeleteConfirmModal_dialog'
        role='dialog'
        aria-modal='true'
        aria-label={t('modal.deleteConfirmation')}
        onClick={(event) => event.stopPropagation()}
      >
        <div className='DeleteConfirmModal_content'>
          <Text text={title} fs_14 fw_xl className='DeleteConfirmModal_title' />
          {subtitle ? <Text text={subtitle} fs_12 ghost className='DeleteConfirmModal_subtitle' /> : null}
        </div>

        <div className='DeleteConfirmModal_actions'>
          <button type='button' className='DeleteConfirmModal_button' onClick={onCancel} disabled={isDeleting}>
            {t('modal.cancel')}
          </button>
          <button
            type='button'
            className='DeleteConfirmModal_button DeleteConfirmModal_button--danger'
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? t('modal.deleting') : t('modal.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
