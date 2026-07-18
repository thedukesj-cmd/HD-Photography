import { en } from "./en"
import { vi } from "./vi"
import { enHome } from "./en-home"
import { viHome } from "./vi-home"
import {
  siteConfig,
  type LanguageCode,
} from "../config/site"

export const translations = {
  en: {
    ...en,
    home: enHome,
  },
  vi: {
    ...vi,
    home: viHome,
  },
} as const

export const defaultLanguage: LanguageCode =
  siteConfig.defaultLanguage

export function getTranslations(language: LanguageCode) {
  return translations[language]
}

export function isSupportedLanguage(
  language: string
): language is LanguageCode {
  return siteConfig.supportedLanguages.includes(
    language as LanguageCode
  )
}