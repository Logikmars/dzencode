'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import i18n from '@/i18n/config';
import { setLanguage, type Language } from '@/store/slices/languageSlice';

const LANGUAGE_STORAGE_KEY = 'dzencode.language';
const supportedLanguages: Language[] = ['ru', 'uk', 'en'];

function isLanguage(value: string): value is Language {
    return supportedLanguages.includes(value as Language);
}

const LanguageSync = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.language.current);

    useEffect(() => {
        const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (storedLanguage && isLanguage(storedLanguage) && storedLanguage !== language) {
            dispatch(setLanguage(storedLanguage));
        }
    }, [dispatch, language]);

    useEffect(() => {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        void i18n.changeLanguage(language);
    }, [language]);

    return <>{children}</>;
};

const AppProviders = ({ children }: PropsWithChildren) => {
    return (
        <Provider store={store}>
            <LanguageSync>{children}</LanguageSync>
        </Provider>
    );
};

export default AppProviders;
