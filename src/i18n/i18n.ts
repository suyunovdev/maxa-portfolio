import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'
import uz from './locales/uz.json'

const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-language') : null

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
  },
  lng: storedLanguage ?? 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18next
