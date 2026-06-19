import Link from "next/link"
import { ArrowLeft, Camera } from "lucide-react"

export default function NotFound() {
  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <Camera className="h-16 w-16 text-zinc-700 mx-auto mb-6" />
        <h1 className="font-playfair text-6xl font-bold text-zinc-700 mb-4">404</h1>
        <h2 className="font-playfair text-2xl text-white mb-4">Page not found</h2>
        <p className="text-zinc-500 mb-8 leading-relaxed">
          This frame does not exist in our archive. Perhaps the page has moved, 
          or the URL was typed incorrectly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-6 py-3 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  )
}
