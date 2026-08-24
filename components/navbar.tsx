"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const {
    language,
    setLanguage,
    translations,
  } = useLanguage()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const ownerHref = `/members/${siteConfig.ownerSlug}`

const navLinks = [
  {
    href: "/",
    label: translations.nav.home,
    visible: true,
  },
  {
    href: ownerHref,
    label: translations.nav.photographer,
    visible: siteConfig.navigation.showOwner,
  },
  {
    href: "/showcase",
    label: translations.nav.showcase,
    visible: siteConfig.navigation.showShowcase,
  },
  {
    href: "/members",
    label: translations.nav.photographers,
    visible: siteConfig.navigation.showGuestPhotographers,
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
].filter((link) => link.visible)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      )
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function isActiveLink(href: string) {
    const currentPath =
      pathname.length > 1 &&
      pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname

    if (href === "/") {
      return currentPath === "/"
    }

    /*
     * Owner profile:
     * /members/hong-duc
     */
    if (href === ownerHref) {
      return (
        currentPath === ownerHref ||
        currentPath.startsWith(
          `${ownerHref}/`
        )
      )
    }

    /*
     * Guest Photographers:
     *
     * Active for:
     * /members
     * /members/guest-name
     *
     * But NOT active for the owner profile.
     */
    if (href === "/members") {
      if (currentPath === "/members") {
        return true
      }

      if (
        currentPath.startsWith("/members/") &&
        currentPath !== ownerHref &&
        !currentPath.startsWith(
          `${ownerHref}/`
        )
      ) {
        return true
      }

      return false
    }

    return (
      currentPath === href ||
      currentPath.startsWith(`${href}/`)
    )
  }

  function changeLanguage(
    newLanguage: "en" | "vi"
  ) {
    setLanguage(newLanguage)
    setOpen(false)
  }

  const mobileMenuLabel =
    language === "vi"
      ? open
        ? "Đóng menu"
        : "Mở menu"
      : open
        ? "Close menu"
        : "Open menu"

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-zinc-800/50 bg-zinc-950/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center"
            aria-label={siteConfig.siteName}
          >
            <Image
              src="/logo.png"
              alt={siteConfig.siteName}
              width={120}
              height={40}
              className="h-10 w-auto object-contain lg:h-12"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActiveLink(link.href)
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language */}
            <div
              className="flex items-center rounded-md border border-zinc-700 bg-zinc-900/70 p-1"
              aria-label={
                language === "vi"
                  ? "Chọn ngôn ngữ"
                  : "Language selection"
              }
            >
              <button
                type="button"
                onClick={() =>
                  changeLanguage("en")
                }
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold transition-colors",
                  language === "en"
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                )}
                aria-pressed={
                  language === "en"
                }
              >
                EN
              </button>

              <button
                type="button"
                onClick={() =>
                  changeLanguage("vi")
                }
                className={cn(
                  "rounded px-2 py-1 text-xs font-semibold transition-colors",
                  language === "vi"
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                )}
                aria-pressed={
                  language === "vi"
                }
              >
                VI
              </button>
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setOpen((current) => !current)
              }
              className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white lg:hidden"
              aria-label={mobileMenuLabel}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / tablet navigation */}
        <div
          id="mobile-navigation"
          className={cn(
          "overflow-hidden border-t border-zinc-800 bg-zinc-950 transition-all duration-300 lg:hidden",
          open
          ? "max-h-[520px] py-3"
         : "max-h-0"
          )}
          >
          <div className="flex flex-col gap-1 border-t border-zinc-800 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActiveLink(link.href)
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
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