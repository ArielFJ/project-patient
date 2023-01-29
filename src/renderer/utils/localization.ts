import es from 'assets/locales/es.json';
import en from 'assets/locales/es.json';

export type Language = 'en' | 'es';

const LOCALE: {
  [key in Language]: { [key: string]: string };
} = {
  es: es,
  en: en
};

const lang: Language = (process.env.LOCALE as Language) ?? 'es';
const locale = LOCALE[lang] ?? LOCALE['es'];

export const trans = (key: string) => locale[key.toLowerCase()] ?? key;
