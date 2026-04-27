# DZEncode Inventory

Веб-приложение для инвентаризации и работы с приходами товаров.

Проект построен на `Next.js (App Router)` + `TypeScript`, использует `PostgreSQL` для данных, `Socket.IO` для realtime-блока и запускается в Docker как единый предсказуемый стек.

## Технологии

- **Frontend/UI**: `React 19`, `Next.js 16`, `SCSS`
- **State management**: `Redux Toolkit`, `react-redux`
- **i18n**: `i18next`, `react-i18next` (RU/UK/EN)
- **Backend в рамках Next.js**: API routes (`app/api/...`)
- **База данных**: `PostgreSQL` через `pg`
- **Realtime**: `socket.io` + `socket.io-client`
- **Качество кода**: `ESLint`, `TypeScript`, `Vitest`
- **Инфраструктура**: `Docker`, `Docker Compose`

## Как устроен проект

Основные директории:

- `src/app` — страницы App Router, layout, API routes
- `src/widgets` — крупные UI-блоки (TopMenu, NavigationMenu, Receipts и т.д.)
- `src/shared` — переиспользуемые компоненты/хуки/сокет
- `src/lib` — серверная бизнес-логика и доступ к данным
- `src/store` — Redux store и слайсы
- `src/i18n` — настройки локализации и словари
- `db` — SQL-инициализация БД (`schema.sql`, `seed.sql`)

Ключевая логика:

- `server.cjs` поднимает Next-сервер и Socket.IO в одном процессе.
- API endpoints:
  - `GET /api/receipts`
  - `DELETE /api/receipts/:id`
  - `DELETE /api/receipts/products/:id`
- Если БД недоступна, данные по приходам берутся из fallback-данных в `src/lib/receipts.ts`.
- В Docker-режиме БД инициализируется автоматически из `db/schema.sql` и `db/seed.sql`.

## Переменные окружения

Используется файл `.env` (локально) и env-переменные в контейнерах.

Шаблон: `.env.example`

- `DATABASE_URL` — строка подключения к PostgreSQL
- `POSTGRES_SSL` — `true/false`
- `NEXT_PUBLIC_SITE_URL` — базовый URL для мета-тегов
- `APP_PORT` — внешний порт приложения (для Docker Compose)

## Быстрый запуск (рекомендуется через Docker)

1. Клонируй репозиторий:
   - `git clone <repo-url>`
   - `cd dzencode`
2. Создай `.env` из шаблона:
   - macOS/Linux: `cp .env.example .env`
   - Windows PowerShell: `Copy-Item .env.example .env`
3. Запусти стек:
   - `npm run docker:up`
4. Открой:
   - App: `http://localhost:3000`
   - Adminer: `http://localhost:8080`

Если порт `3000` занят:

- macOS/Linux: `APP_PORT=3001 npm run docker:up`
- Windows PowerShell: `$env:APP_PORT=3001; npm run docker:up`

После этого приложение будет доступно на `http://localhost:3001`.

## Docker-команды для ежедневной работы

- Собрать образ: `npm run docker:build`
- Поднять/обновить стек: `npm run docker:up`
- Остановить стек: `npm run docker:down`
- Перезапустить стек: `npm run docker:restart`
- Смотреть логи приложения: `npm run docker:logs`
- Проверить контейнеры: `npm run docker:ps`

## Локальная разработка без Docker

1. Убедись, что PostgreSQL запущен и `DATABASE_URL` в `.env` валиден.
2. Установи зависимости: `npm ci`
3. Запусти dev-сервер: `npm run dev`
4. Открой: `http://localhost:3000`

## Проверка качества

- Линтер: `npm run lint`
- Unit-тесты: `npm run test:unit`
- Сборка production: `npm run build`

## Деплой на сервер (VPS/VM)

Рекомендуемый путь:

1. Установить Docker + Docker Compose на сервер.
2. Залить/склонировать проект.
3. Создать `.env` из `.env.example` и проставить production-значения.
4. Запустить:
   - `npm run docker:up`
5. Настроить reverse proxy (`Nginx`/`Caddy`) на `APP_PORT`.
6. Включить HTTPS (Let's Encrypt).

Минимальные практики для production:

- включить авто-рестарт контейнеров (уже задано `restart: unless-stopped`);
- настроить мониторинг логов и бэкапы Postgres volume.

## Работа с Git и перенос между машинами

Чтобы спокойно работать с Mac/Windows/Linux:

- коммить в репозиторий только код и конфиги;
- не коммить `.env`, `.next`, `node_modules`, локальные логи;
- использовать `.env.example` как единый шаблон;
- запускать проект через `docker compose` для одинакового окружения на любой ОС.

## Что важно знать

- Проект может работать даже без БД (через fallback данные), но операции удаления в этом режиме отключены.
- Socket.IO уже интегрирован в `server.cjs`, отдельный realtime-сервис поднимать не нужно.
- Основной сценарий “всегда работает” в команде: запускать через Docker и держать актуальный `.env`.
