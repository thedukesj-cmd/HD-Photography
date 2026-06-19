"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">Contact Us</h1>
          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Whether you want to join the club, ask about a workshop, or just say hello —
            we would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
                alt="Club venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", value: "The Grain Loft, 14 Camera Lane, Dublin D02 XF12" },
                { icon: Mail, label: "Email", value: "hello@apertureclub.org" },
                { icon: Clock, label: "Meetings", value: "Second Thursday of each month, 7:00pm – 9:30pm" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                    <p className="text-zinc-300 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <CheckCircle className="h-14 w-14 text-amber-400 mb-5" />
                <h2 className="font-playfair text-3xl text-white font-bold mb-3">Message Sent!</h2>
                <p className="text-zinc-400 max-w-xs">We will be in touch shortly. Thank you for reaching out.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8"
                name="contact"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Subject</label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Message</label>
                  <textarea
                    id="message" name="message" rows={6} required
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm resize-none"
                    placeholder="Tell us about yourself or your enquiry..."
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200"
                >
                  {loading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-zinc-900 border-t-transparent rounded-full" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
                <p className="text-xs text-zinc-600 text-center">
                  Or email us at{" "}
                  <a href="mailto:hello@apertureclub.org" className="text-amber-400 hover:underline">hello@apertureclub.org</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
