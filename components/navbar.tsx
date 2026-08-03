"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, translations } = useLanguage()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    {
      href: "/",
      label: translations.nav.home,
      visible: true,
    },
    {
      href: `/members/${siteConfig.ownerSlug}`,
      label: translations.nav.photographer,
      visible: siteConfig.navigation.showOwner,
    },
    {
      href: "/members",
      label: translations.nav.photographers,
      visible: siteConfig.navigation.showGuestPhotographers,
    },
    {
      href: "/showcase",
      label: translations.nav.showcase,
      visible: siteConfig.navigation.showShowcase,
    },
    {
  href: "/news",
  label: translations.nav.news,
  visible: siteConfig.navigation.showNews,
    },
    {
  href: "/tutorials",
  label: translations.nav.articles,
  visible: siteConfig.navigation.showTutorials,
    },
    {
      href: "/about",
      label: translations.nav.about,
      visible: siteConfig.navigation.showAbout,
    },
    {
      href: "/contact",
      label: translations.nav.contact,
      visible: siteConfig.navigation.showContact,
    },
  ].filter(link => link.visible)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function isActiveLink(href: string) {
  const currentPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  if (href === "/") {
    return currentPath === "/"
  }

  if (href === "/members") {
    return currentPath === "/members"
  }

  return (
    currentPath === href ||
    currentPath.startsWith(`${href}/`)
  )
}

  function changeLanguage(newLanguage: "en" | "vi") {
    setLanguage(newLanguage)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-zinc-800/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label={siteConfig.siteName}
          >
            <Image
              src="/logo.png"
              alt={siteConfig.siteName}
              width={120}
              height={40}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActiveLink(link.href)
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language switch */}
            <div
              className="flex items-center rounded-md border border-zinc-700 bg-zinc-900/70 p-1"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => changeLanguage("en")}
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold transition-colors",
                  language === "en"
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                )}
                aria-pressed={language === "en"}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => changeLanguage("vi")}
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold transition-colors",
                  language === "vi"
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                )}
                aria-pressed={language === "vi"}
              >
                VI
              </button>
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-zinc-800">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  isActiveLink(link.href)
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}