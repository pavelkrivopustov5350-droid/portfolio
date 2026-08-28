import type { Profile } from "./types";

export const profile: Profile = {
  name: "Павел Кривопустов",
  nameLat: "PAVEL KRIVOPUSTOV",
  titleLines: ["HEAD OF MARKETING", "HEAD OF GROWTH"],
  role: "Growth / Marketing Lead",
  subtitle:
    "Growth / Marketing Lead с опытом запуска и масштабирования fintech-направлений.",
  statement:
    "Умею не только покупать трафик, но и менять инфраструктуру его поставки.",
  location: "Москва · офис / гибрид / удалёнка · готов к командировкам",
  availability: "Открыт к предложениям",

  /* KEY METRICS — только проценты, кратность и объёмы. Без денежных сумм. */
  metrics: [
    { value: "×10", label: "масштабирование SMS-направления", count: 10, prefix: "×" },
    { value: "−50%", label: "стоимость лида, CPL", count: 50, prefix: "−", suffix: "%" },
    { value: "×2", label: "рост конверсии трафика", count: 2, prefix: "×" },
    { value: "×2–3", label: "прибыльность ML-направления" },
    { value: "50 000", label: "SMS в день", count: 50000, group: true },
    { value: "150–200K", label: "заявок в месяц" },
    { value: "~8%", label: "средний CTR", count: 8, prefix: "~", suffix: "%" },
    { value: "1M+", label: "звонков в месяц" },
  ],

  skills: [
    {
      index: "01",
      title: "GROWTH",
      items: [
        "Performance",
        "CRM",
        "SMS",
        "Email",
        "Acquisition",
        "Retention",
        "Lifecycle",
      ],
    },
    {
      index: "02",
      title: "DATA",
      items: ["SQL", "Python", "Analytics", "BI", "Scoring", "ML", "Experimentation"],
    },
    {
      index: "03",
      title: "PRODUCT & TECH",
      items: [
        "CRM",
        "API",
        "Database",
        "Automation",
        "MVP",
        "Roadmap",
        "Tech specs",
      ],
    },
    {
      index: "04",
      title: "MANAGEMENT",
      items: [
        "Contractors",
        "Partners",
        "Developers",
        "Analysts",
        "KPI",
        "Budgeting",
        "Negotiations",
      ],
    },
  ],

  approach: [
    {
      index: "01",
      title: "UNDERSTAND",
      text: "Разбираюсь в экономике, данных, воронке и ограничениях направления.",
    },
    {
      index: "02",
      title: "BUILD",
      text: "Собираю инфраструктуру, процессы и инструменты под задачу.",
    },
    {
      index: "03",
      title: "SCALE",
      text: "Тестирую, оптимизирую и масштабирую то, что уже работает.",
    },
  ],

  contacts: [
    {
      kind: "phone",
      label: "Phone",
      value: "+7 917 834-98-94",
      href: "tel:+79178349894",
      copy: "+79178349894",
    },
    {
      kind: "telegram",
      label: "Telegram",
      value: "@MainPavel",
      href: "https://t.me/MainPavel",
    },
    {
      kind: "email",
      label: "Email",
      value: "krivopustov00@mail.ru",
      href: "mailto:krivopustov00@mail.ru",
      copy: "krivopustov00@mail.ru",
    },
  ],
};
