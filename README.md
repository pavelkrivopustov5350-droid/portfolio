# Портфолио — Павел Кривопустов · Project / Growth Lead

Одностраничный сайт-резюме в тёмной сай-фай теме. Кейсы по каждой роли
открываются боковой панелью, ссылка вида `…/#/case/<id>`.

Live: **https://pavelkrivopustov5350-droid.github.io/portfolio/**

Стек: **Vite + React + TypeScript**. Внешних рантайм-зависимостей на страницах нет
(шрифты — Google Fonts).

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173 — режим разработки
npm run build      # сборка в dist/
npm run preview    # посмотреть собранную версию
npm run typecheck  # проверка типов
```

Нужен Node 18+.

## Где править контент

Весь текст сайта — в `src/data/`. Больше нигде трогать не нужно.

| Файл | Что внутри |
| --- | --- |
| `src/data/profile.ts` | Имя, роль, питч на первом экране, навыки, опыт (таймлайн), контакты |
| `src/data/projects.ts` | `cases` — подробные кейсы по ролям |
| `src/data/types.ts` | Описание всех полей (справочник, менять не обязательно) |

### Добавить кейс

1. В `src/data/projects.ts` добавь объект в массив `cases` (скопируй соседний как шаблон).
   Обязательные поля: `id`, `title`, `role`, `period`, `org`, `tagline`, `tags`,
   `metrics`, `blocks`. Необязательные: `related`, `links`, `accent`.
2. Кейс сразу появится в секции «Кейсы» и будет открываться по прямой ссылке
   `…/#/case/<id>`.

### Поменять цвета / шрифты

`src/styles/theme.css` — все переменные темы (фон, акценты, свечение, типографика).

## Деплой

Сборка статическая, `base` = `./`, поэтому кладётся куда угодно.

- **GitHub Pages**: настроен через `.github/workflows/deploy.yml` — при каждом push
  в `main` собирается и публикуется на `https://<user>.github.io/portfolio/`.
  Один раз нужно: Settings → Pages → Source → **GitHub Actions**.
- **Netlify / Vercel**: подключить репозиторий, build `npm run build`, publish `dist`.
- **Любой хостинг**: залить содержимое `dist/`.

## Структура

```
src/
  data/         контент (профиль, кейсы)
  components/
    Backdrop        живой фон (частицы + радар-развёртка)
    Nav / Hero      шапка и первый экран
    CaseIndex       сетка карточек кейсов
    CasePanel       боковая панель с полным кейсом
    About / Timeline / Contact / Footer
    ui/             мелкие примитивы (Metric, Tag, GlitchText)
  hooks/          useHashRoute (ссылки на кейсы), useReveal (появление при скролле)
  styles/         theme.css + global.css
```

## Доступность

- Уважается `prefers-reduced-motion` — анимации фона замирают.
- Контент подгружается с появлением при прокрутке; без JS кейсы не откроются
  (обычный SPA).
