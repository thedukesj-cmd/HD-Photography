"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const subject = form.subject || `Message from ${form.name}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n")

    window.location.href =
      `mailto:theduke.sj@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            SAY HELLO
          </p>

          <h1 className="font-playfair text-5xl md:text-6xl text-white font-bold">
            Contact
          </h1>

          <p className="text-zinc-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Thank you for visiting HD Photography. Whether you have a question,
            would like to talk about photography, or simply want to say hello,
            I would be happy to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
                alt="Photography and architecture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-amber-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-0.5">
                    Location
                  </p>
                  <p className="text-zinc-300 text-sm">
                    San Jose, California
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-amber-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-0.5">
                    Email
                  </p>
                  <p className="text-zinc-300 text-sm">
                    Contact me using the form
                  </p>
                </div>
              </div>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed">
              Photography has introduced me to wonderful places and wonderful
              people. I hope our paths cross through photography someday.
            </p>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <CheckCircle className="h-14 w-14 text-amber-400 mb-5" />

                <h2 className="font-playfair text-3xl text-white font-bold mb-3">
                  Your email is ready
                </h2>

                <p className="text-zinc-400 max-w-sm">
                  Your email application should open with the message filled in.
                  Review it, then send it when ready.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e =>
                        setForm(current => ({
                          ...current,
                          name: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e =>
                        setForm(current => ({
                          ...current,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={e =>
                      setForm(current => ({
                        ...current,
                        subject: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={e =>
                      setForm(current => ({
                        ...current,
                        message: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                  Prepare Email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}