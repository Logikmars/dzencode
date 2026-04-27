'use client';

import React from 'react';
import './NavigationMenu.scss';
import { Settings } from 'lucide-react';
import Link from '@/shared/Link/Link';
import NextLink from 'next/link';
import RealTime from '../RealTime/RealTime';
import { useTranslation } from 'react-i18next';

const navigationItems = [
    { titleKey: 'nav.receipts', href: '/' },
    { titleKey: 'nav.groups', href: '/groups' },
    { titleKey: 'nav.products', href: '/products' },
    { titleKey: 'nav.users', href: '/users' },
    { titleKey: 'nav.settings', href: '/settings' },
] as const;

const NavigationMenu: React.FC = () => {
    const { t } = useTranslation();

    return (
        <aside className='NavigationMenu'>
            <div className='NavigationMenu_user'>
                <div className='NavigationMenu_user_icon'>
                    <img src="/images/user.png" alt="User logo" />
                </div>
                <div className='NavigationMenu_user_decor free_img'>
                    <NextLink href={'/settings'}className='NavigationMenu_user_setting' aria-label={t('nav.profileSettings')}>
                        <Settings size={20} stroke='#000'/>
                    </NextLink>
                </div>
            </div>
            <nav className='NavigationMenu_list'>
                {navigationItems.map((item) => (
                    <Link key={item.href} text={t(item.titleKey)} href={item.href} />
                ))}
            </nav>
            <div className='NavigationMenu_realtime'>
                <RealTime />
            </div>
        </aside>
    );
};

export default NavigationMenu;
