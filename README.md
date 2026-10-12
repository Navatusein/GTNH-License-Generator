# Бюро лицензий GTNH

Шуточный генератор «официальных лицензий» для GregTech: New Horizons. Вводишь ник — получаешь PNG с лицензией.
QR-код на лицензии ведёт на страницу проверки подлинности.

## Запуск

```bash
npm install
npm run dev      # dev-сервер
npm run build    # сборка в dist/
```

## Структура (FSD)

```
src/
  app/        точка входа, роутер (HashRouter), layout
  views/      generator, verify, not-found
  widgets/    header, footer
  features/   download-license — экспорт лицензии в PNG
  entities/   license — тип, подпись/проверка, карточка лицензии
  share/      общие стили, хуки, хелперы
```

## Как работает проверка

Бэкенда нет. Ссылка в QR-коде выглядит как `#/verify?id=<id>`. В `id` упакованы ник и дата: они закрыты XOR-шифром
с контрольным тегом и закодированы в base64url (`entities/license/helpers/license-helper.ts`). Страница проверки
расшифровывает `id` и сверяет тег. Это скрывает данные от глаз и защищает от правки ссылки, но не является
криптографией: ключ лежит в клиентском коде.

## Деплой

Workflow `.github/workflows/deploy-github-pages.yml` при пуше в `main` собирает проект и публикует `dist` в ветку
`gh-pages`. В настройках репозитория: Settings → Pages → Deploy from a branch → `gh-pages`.
