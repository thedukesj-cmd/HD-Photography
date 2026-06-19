import Link from "next/link"
import { Aperture, Instagram, Globe, Mail } from "lucide-react"

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/members", label: "Member Galleries" },
  { href: "/showcase", label: "Monthly Showcase" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/news", label: "News & Events" },
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
                Aperture <span className="text-amber-400">Club</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A community of passionate photographers united by the love of light, 
              composition, and the stories images can tell.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Website">
                <Globe className="h-4 w-4" />
              </a>
              <a href="mailto:hello@hdphotography.club" className="hover:text-amber-400 transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">Quick Links</h3>
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

          {/* Contact info */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <p>Meets every second Thursday, 7pm</p>
              <p>The Grain Loft, 14 Camera Lane</p>
              <p>Dublin, Ireland D02 XF12</p>
              <a href="mailto:hello@hdphotography.club" className="block hover:text-amber-400 transition-colors mt-4">
                hello@hdphotography.club
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} HD Photography Club. All rights reserved.</p>
          <p>Content managed with <a href="/admin" className="hover:text-amber-400 transition-colors">Decap CMS</a></p>
        </div>
      </div>
    </footer>
  )
}
