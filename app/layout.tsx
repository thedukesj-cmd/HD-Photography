import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "A personal photography gallery featuring the work of Hong-Duc Nguyen and invited guest photographers.",
  keywords: [
    "photography",
    "photo gallery",
    "landscape photography",
    "travel photography",
    "guest photographers",
    siteConfig.siteName,
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description:
      "A personal photography gallery featuring the work of Hong-Duc Nguyen and invited guest photographers.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description:
      "A personal photography gallery featuring the work of Hong-Duc Nguyen and invited guest photographers.",
  },
}

const darkModeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var dark = t ? t === 'dark' : true;
    document.documentElement.classList.toggle('dark', dark);
  } catch(e){}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={siteConfig.defaultLanguage}
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>

      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <LanguageProvider>
          <Suspense fallback={<div className="h-16 md:h-20" />}>
            <Navbar />
          </Suspense>

          <main className="pt-16 md:pt-20">{children}</main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}