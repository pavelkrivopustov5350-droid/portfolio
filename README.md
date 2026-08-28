# Портфолио — Павел Кривопустов · Head of Marketing / Head of Growth

Одностраничный сайт-портфолио в тёмной минималистичной sci-fi / fintech эстетике.
Прогрессивное раскрытие: на первом уровне — суть и цифры, детали открываются по клику.

Live: **https://pavelkrivopustov5350-droid.github.io/portfolio/**

Стек: **Vite + React + TypeScript**, чистый CSS с дизайн-токенами. Без тяжёлых
библиотек — анимации на CSS + IntersectionObserver. Шрифты — Google Fonts
(Inter, Space Grotesk, JetBrains Mono).

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # сборка в dist/
npm run preview    # предпросмотр сборки
npm run typecheck  # проверка типов
```

Нужен Node 18+.

## Структура секций

`Hero → Impact / Key Metrics → Cases → Process → Experience → Skills → About → Approach → Contact`

**Process** — scroll-driven «терминал»: по мере прокрутки собирается лог запуска
маркетингового направления, прогресс-бар до 100% и финальный результат
(компонент `Process.tsx`, шаги — в массиве `STEPS` внутри него).

## Где править контент

Весь текст — в `src/data/`:

| Файл | Что внутри |
| --- | --- |
| `src/data/profile.ts` | Имя, титул, питч, метрики, навыки, подход, блок «О себе», контакты |
| `src/data/cases.ts` | 4 главных кейса: метрики, challenge / approach / result, команда, pipeline-схема |
| `src/data/experience.ts` | Таймлайн ролей + подпроекты LSR (FinBro, SMSLeads, CRMCalls, MoreZaim, LeadFin) |
| `src/data/types.ts` | Описание всех полей |

### Метрики

`Metric.count` включает счётчик, который «набегает» при появлении:
`{ value: "×10", count: 10, prefix: "×", label: "…" }`. Без `count` — статичное значение.
В цифрах — только проценты, ROI, кратность и объёмы. Денежных сумм на сайте нет.

### Pipeline-схема в кейсе

`pipeline: { title, steps: [...], merge?: 2, loop?: true, loopLabel?: "…" }` —
вертикальная технологическая схема. `merge` — первые N шагов как параллельные входы,
`loop` — замыкающий узел обратной связи.

### Тема

`src/styles/tokens.css` — все переменные (цвета, радиусы, типографика, тайминги).
Акцент — `--accent` (electric blue).

## Компоненты

```
components/
  Backdrop        сдержанный фон: редкие точки + связи
  Header          навигация, active-секция, мобильное меню
  Hero / HeroViz  первый экран + минимальная SVG-визуализация
  Metrics / Stat  ключевые цифры со счётчиком
  Cases / CaseStudy / Pipeline   главный блок, раскрывающиеся кейсы
  Experience      таймлайн + подпроекты LSR
  Skills / Approach / Contact / Footer
hooks/
  useReveal        появление при прокрутке
  useCountUp        счётчик чисел
  useActiveSection  подсветка активного пункта меню
  useScrollLock     блокировка прокрутки под мобильным меню
```

## Деплой

Сборка статическая, `base: './'`. GitHub Pages настроен через
`.github/workflows/deploy.yml` — пересобирается при каждом push в `main`.

## Доступность

`prefers-reduced-motion` — фон и счётчики замирают. Раскрытия закрываются по `Esc`.
Фокус-состояния у всех интерактивных элементов. Без JS кейсы не раскроются (обычный SPA).
