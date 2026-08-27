import type { Profile } from "./types";

/**
 * ДЕМО-ДАННЫЕ. Замени на свои: имя, питч, навыки, опыт, контакты.
 * Всё, что здесь, отображается в шапке, секции «О себе», таймлайне и футере.
 */
export const profile: Profile = {
  name: "Алекс Ковач",
  title: "Project / Growth Lead",
  location: "Тбилиси · работаю в UTC+1…+4",
  pitch:
    "Веду продуктовые команды от гипотезы до устойчивого роста. Собираю систему из привлечения, активации и удержания так, чтобы каждый канал усиливал соседний, а не жил отдельной жизнью. За 6 лет — 4 продукта от 0 к первым миллионам выручки.",
  highlights: [
    "ARR ×4 за 18 месяцев",
    "CAC −41% при росте объёма",
    "команды 4 → 19 человек",
    "12 продуктовых запусков",
    "retention D30 +17 п.п.",
  ],
  skills: [
    {
      title: "Рост",
      items: [
        "Growth-модель и юнит-экономика",
        "Перформанс-маркетинг (paid social, search)",
        "Жизненный цикл: активация, retention, реактивация",
        "Ценообразование и упаковка тарифов",
        "Реферальные и виральные петли",
        "A/B-тесты и приоритизация экспериментов",
      ],
    },
    {
      title: "Продукт и проект",
      items: [
        "Discovery, JTBD, продуктовые интервью",
        "Roadmap и приоритизация (RICE, ICE)",
        "Дискавери-дельта и трекинг гипотез",
        "Agile / Shape Up, управление рисками",
        "Продуктовая аналитика (Amplitude, GA4, Metabase)",
        "OKR и каскадирование целей",
      ],
    },
    {
      title: "Команда и процессы",
      items: [
        "Найм и онбординг продуктовых команд",
        "Кросс-функциональная синхронизация",
        "Ритуалы: планирование, ретро, ревью роста",
        "Работа со стейкхолдерами и борд-репортинг",
        "Наставничество продактов и маркетологов",
      ],
    },
    {
      title: "Инструменты",
      items: [
        "Amplitude · Mixpanel · GA4",
        "Metabase · Looker · dbt (базово)",
        "Linear · Jira · Notion",
        "Figma · Miro",
        "SQL · Python (pandas) для ad-hoc анализа",
        "HubSpot · Customer.io · AppsFlyer",
      ],
    },
  ],
  timeline: [
    {
      period: "2023 — н.в.",
      role: "Growth Lead",
      org: "Nimbus Analytics (B2B SaaS)",
      note: "Собрал growth-функцию с нуля: модель, команда 7 человек, ARR ×4 за полтора года.",
    },
    {
      period: "2021 — 2023",
      role: "Senior Product Manager → Group PM",
      org: "Orbita (мобильное образование)",
      note: "Отвечал за активацию и подписку. D30 retention +17 п.п., запуск годового тарифа.",
    },
    {
      period: "2019 — 2021",
      role: "Product Manager",
      org: "Karta (маркетплейс услуг)",
      note: "Запуск реферальной программы и B2B-направления, которое выделилось в отдельный продукт.",
    },
    {
      period: "2017 — 2019",
      role: "Performance Marketing Manager",
      org: "Digital-агентство Fokus",
      note: "Вёл платный трафик для 15+ клиентов, вырос до руководителя группы из 4 человек.",
    },
  ],
  contacts: [
    { label: "Email", value: "alex.kovac@example.com", url: "mailto:alex.kovac@example.com" },
    { label: "Telegram", value: "@alexkovac", url: "https://t.me/alexkovac" },
    { label: "LinkedIn", value: "in/alexkovac", url: "https://linkedin.com/in/alexkovac" },
    { label: "CV (PDF)", value: "скачать резюме", url: "#" },
  ],
};
