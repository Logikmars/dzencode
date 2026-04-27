'use client';

import React from 'react';
import NextLink from 'next/link';
import './not-found.scss';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <main className='NotFound page'>
            <div className='NotFound_content'>
                <p className='NotFound_code'>404</p>
                <h1 className='NotFound_title'>{t('notFound.title')}</h1>
                <p className='NotFound_text'>
                    {t('notFound.text')}
                </p>
                <NextLink href='/' className='NotFound_link'>
                    {t('notFound.backHome')}
                </NextLink>
            </div>
        </main>
    );
}
