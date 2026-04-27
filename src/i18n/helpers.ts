import { Language } from '@/store/slices/languageSlice';

const localeMap: Record<Language, string> = {
    ru: 'ru-RU',
    uk: 'uk-UA',
    en: 'en-US',
};

export function languageToLocale(language: Language) {
    return localeMap[language];
}

export function getStatusTranslationKey(status: string) {
    const normalized = status.trim().toLowerCase();

    if (['свободен', 'вільний', 'available', 'free'].includes(normalized)) {
        return 'receipts.status.free';
    }

    if (['в ремонте', 'у ремонті', 'in repair'].includes(normalized)) {
        return 'receipts.status.inRepair';
    }

    if (['в использовании', 'у використанні', 'in use'].includes(normalized)) {
        return 'receipts.status.inUse';
    }

    return '';
}
