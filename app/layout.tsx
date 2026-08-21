import type { Metadata } from "next"
import { Suspense } from "react"

import "./globals.css"

import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { siteConfig } from "@/config/site"

const siteDescription =
  "A personal photography portfolio by Hong-Duc Nguyen, featuring nature, travel, landscapes, and selected guest photographers."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),

  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: siteDescription,

  keywords: [
    "photography",
    "photo gallery",
    "landscape photography",
    "nature photography",
    "travel photography",
    "fine art photography",
    "California photography",
    "guest photographers",
    "Hong-Duc Nguyen",
    siteConfig.siteName,
  ],

  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        alt: siteConfig.siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteDescription,
    images: ["/logo.png"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: darkModeScript,
          }}
        />
      </head>

      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <LanguageProvider>
          <Suspense
            fallback={
              <div className="h-16 lg:h-20" />
            }
          >
            <Navbar />
          </Suspense>

          <main className="pt-16 lg:pt-20">
            {children}
          </main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}