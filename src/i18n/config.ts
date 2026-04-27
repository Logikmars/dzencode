import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    ru: {
        translation: {
            topMenu: {
                searchPlaceholder: 'Поиск',
            },
            nav: {
                receipts: 'Приход',
                groups: 'Группы',
                products: 'Продукты',
                users: 'Пользователи',
                settings: 'Настройки',
                profileSettings: 'Настройки профиля',
            },
            settings: {
                language: 'Язык интерфейса',
            },
            receipts: {
                listTitle: 'Приходы / {{count}}',
                addReceipt: 'Добавить приход',
                backToReceipts: 'К приходам',
                productsTitle: 'Продукты / {{count}}',
                type: 'Тип:',
                specification: 'Спецификация:',
                all: 'Все',
                emptyByFilters: 'По выбранным фильтрам товаров не найдено.',
                deleteReceiptQuestion: 'Вы уверены, что хотите удалить этот приход?',
                deleteProductQuestion: 'Вы уверены, что хотите удалить этот товар?',
                deleteUnavailable: 'Удаление недоступно, пока база данных не подключена.',
                fallbackDataWarning:
                    'База данных сейчас недоступна. Показаны fallback-данные, удаление отключено.',
                failedLoad: 'Не удалось загрузить приходы.',
                failedDeleteReceipt: 'Не удалось удалить приход.',
                failedDeleteProduct: 'Не удалось удалить товар.',
                deleteReceipt: 'Удалить приход',
                deleteProduct: 'Удалить товар',
                fallbackDeleteHint: 'Удаление недоступно, пока показываются fallback-данные',
                from: 'с {{date}}',
                to: 'по {{date}}',
                arrivalFrom: 'от {{date}}',
                productLabel_one: 'Продукт',
                productLabel_few: 'Продукта',
                productLabel_many: 'Продуктов',
                productLabel_other: 'Продуктов',
                status: {
                    free: 'Свободен',
                    inRepair: 'В ремонте',
                    inUse: 'В использовании',
                },
            },
            groups: {
                addGroup: 'Добавить группу',
                close: 'Закрыть',
                addProduct: 'Добавить продукт',
                emptyReceipt: 'В этом приходе пока нет продуктов.',
                selectReceipt: 'Выбери приход слева, чтобы открыть его содержимое.',
            },
            modal: {
                deleteConfirmation: 'Подтверждение удаления',
                cancel: 'ОТМЕНИТЬ',
                deleting: 'УДАЛЕНИЕ...',
                delete: 'УДАЛИТЬ',
            },
            notFound: {
                title: 'Страница не найдена',
                text: 'Похоже, такого раздела пока нет или адрес указан неверно.',
                backHome: 'Вернуться на главную',
            },
            common: {
                appTitle: 'Инвентарь',
                ruShort: 'Рус',
                ukShort: 'Укр',
                enShort: 'Eng',
            },
        },
    },
    uk: {
        translation: {
            topMenu: {
                searchPlaceholder: 'Пошук',
            },
            nav: {
                receipts: 'Надходження',
                groups: 'Групи',
                products: 'Продукти',
                users: 'Користувачі',
                settings: 'Налаштування',
                profileSettings: 'Налаштування профілю',
            },
            settings: {
                language: 'Мова інтерфейсу',
            },
            receipts: {
                listTitle: 'Надходження / {{count}}',
                addReceipt: 'Додати надходження',
                backToReceipts: 'До надходжень',
                productsTitle: 'Продукти / {{count}}',
                type: 'Тип:',
                specification: 'Специфікація:',
                all: 'Усі',
                emptyByFilters: 'За вибраними фільтрами товарів не знайдено.',
                deleteReceiptQuestion: 'Ви впевнені, що хочете видалити це надходження?',
                deleteProductQuestion: 'Ви впевнені, що хочете видалити цей товар?',
                deleteUnavailable: 'Видалення недоступне, доки база даних не підключена.',
                fallbackDataWarning:
                    'База даних зараз недоступна. Показано fallback-дані, видалення вимкнено.',
                failedLoad: 'Не вдалося завантажити надходження.',
                failedDeleteReceipt: 'Не вдалося видалити надходження.',
                failedDeleteProduct: 'Не вдалося видалити товар.',
                deleteReceipt: 'Видалити надходження',
                deleteProduct: 'Видалити товар',
                fallbackDeleteHint: 'Видалення недоступне, поки показуються fallback-дані',
                from: 'з {{date}}',
                to: 'до {{date}}',
                arrivalFrom: 'від {{date}}',
                productLabel_one: 'Продукт',
                productLabel_few: 'Продукти',
                productLabel_many: 'Продуктів',
                productLabel_other: 'Продуктів',
                status: {
                    free: 'Вільний',
                    inRepair: 'У ремонті',
                    inUse: 'У використанні',
                },
            },
            groups: {
                addGroup: 'Додати групу',
                close: 'Закрити',
                addProduct: 'Додати продукт',
                emptyReceipt: 'У цьому надходженні поки немає продуктів.',
                selectReceipt: 'Вибери надходження ліворуч, щоб відкрити його вміст.',
            },
            modal: {
                deleteConfirmation: 'Підтвердження видалення',
                cancel: 'СКАСУВАТИ',
                deleting: 'ВИДАЛЕННЯ...',
                delete: 'ВИДАЛИТИ',
            },
            notFound: {
                title: 'Сторінку не знайдено',
                text: 'Схоже, такого розділу поки немає або адресу вказано неправильно.',
                backHome: 'Повернутися на головну',
            },
            common: {
                appTitle: 'Інвентар',
                ruShort: 'Рос',
                ukShort: 'Укр',
                enShort: 'Анг',
            },
        },
    },
    en: {
        translation: {
            topMenu: {
                searchPlaceholder: 'Search',
            },
            nav: {
                receipts: 'Receipts',
                groups: 'Groups',
                products: 'Products',
                users: 'Users',
                settings: 'Settings',
                profileSettings: 'Profile settings',
            },
            settings: {
                language: 'Interface language',
            },
            receipts: {
                listTitle: 'Receipts / {{count}}',
                addReceipt: 'Add receipt',
                backToReceipts: 'Back to receipts',
                productsTitle: 'Products / {{count}}',
                type: 'Type:',
                specification: 'Specification:',
                all: 'All',
                emptyByFilters: 'No products found for selected filters.',
                deleteReceiptQuestion: 'Are you sure you want to delete this receipt?',
                deleteProductQuestion: 'Are you sure you want to delete this product?',
                deleteUnavailable: 'Delete is unavailable until the database is connected.',
                fallbackDataWarning:
                    'Database is currently unavailable. Fallback data is shown, delete is disabled.',
                failedLoad: 'Failed to load receipts.',
                failedDeleteReceipt: 'Failed to delete receipt.',
                failedDeleteProduct: 'Failed to delete product.',
                deleteReceipt: 'Delete receipt',
                deleteProduct: 'Delete product',
                fallbackDeleteHint: 'Delete is unavailable while fallback data is shown',
                from: 'from {{date}}',
                to: 'to {{date}}',
                arrivalFrom: 'from {{date}}',
                productLabel_one: 'Product',
                productLabel_other: 'Products',
                status: {
                    free: 'Available',
                    inRepair: 'In repair',
                    inUse: 'In use',
                },
            },
            groups: {
                addGroup: 'Add group',
                close: 'Close',
                addProduct: 'Add product',
                emptyReceipt: 'There are no products in this receipt yet.',
                selectReceipt: 'Select a receipt on the left to open its content.',
            },
            modal: {
                deleteConfirmation: 'Delete confirmation',
                cancel: 'CANCEL',
                deleting: 'DELETING...',
                delete: 'DELETE',
            },
            notFound: {
                title: 'Page not found',
                text: 'Looks like this section does not exist yet or the address is incorrect.',
                backHome: 'Back to home',
            },
            common: {
                appTitle: 'Inventory',
                ruShort: 'Rus',
                ukShort: 'Ukr',
                enShort: 'Eng',
            },
        },
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
