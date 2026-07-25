"use client"

import { ContactHero } from "@/components/contact-hero"
import { ContactInfo } from "@/components/contact-info"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
       <ContactHero />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>)}