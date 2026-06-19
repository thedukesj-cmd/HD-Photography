"use client"
import { ReactNode } from "react"
// Simplified: dark mode is handled via inline script + CSS class
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
