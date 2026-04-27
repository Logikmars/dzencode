'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Language, setLanguage } from '@/store/slices/languageSlice';

const languageOptions: Language[] = ['ru', 'uk', 'en'];

const Page: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.language.current);
    const activeIndex = languageOptions.findIndex((option) => option === language);

    return (
        <div className='page Settings'>
            <div className='language-toggle-wrap'>
                <span className='language-toggle-label'>{t('settings.language')}</span>
                <div
                    className='language-toggle'
                    role='tablist'
                    aria-label={t('settings.language')}
                >
                    <span
                        className='language-toggle-indicator'
                        style={{ transform: `translateX(${activeIndex * 100}%)` }}
                    />
                    {languageOptions.map((option) => (
                        <button
                            key={option}
                            type='button'
                            role='tab'
                            aria-selected={language === option}
                            className={`language-toggle-option${language === option ? ' is-active' : ''}`}
                            onClick={() => dispatch(setLanguage(option))}
                        >
                            {option === 'ru' && t('common.ruShort')}
                            {option === 'uk' && t('common.ukShort')}
                            {option === 'en' && t('common.enShort')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;