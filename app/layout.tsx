import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: "HD Photography Club",
    template: "%s | HD Photography",
  },
  description: "A community of passionate photographers united by the love of light, composition, and storytelling through images.",
  keywords: ["photography", "camera club", "photo gallery", "tutorials", "community", "HD Photography"],
  openGraph: {
    type: "website",
    siteName: "HD Photography Club",
    title: "HD Photography Club",
    description: "A community of passionate photographers united by the love of light, composition, and storytelling through images.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "HD Photography Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HD Photography Club",
    description: "A community of passionate photographers united by the love of light, composition, and storytelling.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <Suspense fallback={<div className="h-16 md:h-20" />}>
          <Navbar />
        </Suspense>
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
