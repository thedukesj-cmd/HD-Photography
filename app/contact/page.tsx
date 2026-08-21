import { ContactHero } from "@/components/contact-hero"
import { ContactInfo } from "@/components/contact-info"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <ContactHero />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  )
}