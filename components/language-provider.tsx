"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import {
  defaultLanguage,
  getTranslations,
  isSupportedLanguage,
} from "@/locales"

import type { LanguageCode } from "@/config/site"

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  toggleLanguage: () => void
  translations: ReturnType<typeof getTranslations>
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
)

const STORAGE_KEY = "photography-platform-language"

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>(defaultLanguage)

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)

    if (
      savedLanguage &&
      isSupportedLanguage(savedLanguage)
    ) {
      setLanguageState(savedLanguage)
    }
  }, [])

  function setLanguage(newLanguage: LanguageCode) {
    setLanguageState(newLanguage)
    window.localStorage.setItem(STORAGE_KEY, newLanguage)
    document.documentElement.lang = newLanguage
  }

  function toggleLanguage() {
    setLanguage(language === "en" ? "vi" : "en")
  }

  const translations = getTranslations(language)

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    )
  }

  return context
}