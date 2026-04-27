'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppSelector } from '@/store/hooks';
import i18n from '@/i18n/config';

const LanguageSync = ({ children }: PropsWithChildren) => {
    const language = useAppSelector((state) => state.language.current);

    useEffect(() => {
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
