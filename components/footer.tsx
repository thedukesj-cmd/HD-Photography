import Link from "next/link"
import { Aperture, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/members/hong-duc", label: "Hong-Duc Nguyen" },
  { href: "/members", label: "Guest Photographers" },
  { href: "/showcase", label: "Showcase" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Aperture className="h-6 w-6 text-amber-400" />
              <span className="font-playfair text-lg font-semibold text-white">
                HD <span className="text-amber-400">Photography</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs">
              Exploring the beauty of nature, travel, and everyday life through photography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                San Jose, California
              </p>

              <Link
                href="/contact"
                className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
              >
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                Contact Hong-Duc
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>
            © {new Date().getFullYear()} HD Photography. All rights reserved.
          </p>

          <p>
            Photography by Hong-Duc Nguyen
          </p>
        </div>
      </div>
    </footer>
  )
}