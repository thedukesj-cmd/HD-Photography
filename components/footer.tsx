"use client"

import Link from "next/link"
import { Aperture, Mail, MapPin } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/config/site"

export function Footer() {
  const { translations } = useLanguage()
  const footer = translations.footer

  const quickLinks = [
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

  const location = [
    siteConfig.location.city,
    siteConfig.location.state,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="group flex w-fit items-center gap-2.5"
            >
              <Aperture className="h-6 w-6 text-amber-400" />

              <span className="font-playfair text-lg font-semibold text-white">
                HD{" "}
                <span className="text-amber-400">
                  Photography
                </span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              {footer.explore}
            </h3>

            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              {footer.contact}
            </h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
                {location}
              </p>

              <Link
                href="/contact"
                className="flex items-center gap-2.5 transition-colors hover:text-amber-400"
              >
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                {footer.contactMe}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.siteName}.{" "}
            {footer.copyright}
          </p>

          <p>{footer.by}</p>
        </div>
      </div>
    </footer>
  )
}