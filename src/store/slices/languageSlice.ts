import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'ru' | 'uk' | 'en';

type LanguageState = {
    current: Language;
};

const initialState: LanguageState = {
    current: 'ru',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.current = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
