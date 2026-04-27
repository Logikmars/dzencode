'use client';

import React from 'react';
import './TopMenu.scss';
import Text from '@/shared/Text/Text';
import RealTime from '../RealTime/RealTime';
import { useTranslation } from 'react-i18next';

const TopMenu: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className='TopMenu'>
            <div className='TopMenu_logo'>
                <div className='TopMenu_logo_company'>
                    <img src="/images/logo.webp" alt="Logo dzencode" className='TopMenu_logo_img' loading='lazy'/>
                    <Text text={t('common.appTitle')} green fs_24 fw_xl/>
                </div>
                <input type="text" className='TopMenu_logo_search' placeholder={t('topMenu.searchPlaceholder')} />
            </div>
            <div className='TopMenu_info'>
                <RealTime />
            </div>
        </header>
    )
};
export default TopMenu