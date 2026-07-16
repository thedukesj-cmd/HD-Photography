import { en } from "./en"
import { vi } from "./vi"
import {
  siteConfig,
  type LanguageCode,
} from "../config/site"

export const translations = {
  en,
  vi,
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