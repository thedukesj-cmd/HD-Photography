"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactForm() {
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
                onChange={(e) =>
                  setForm((current) => ({
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
                onChange={(e) =>
                  setForm((current) => ({
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
              onChange={(e) =>
                setForm((current) => ({
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
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  message: e.target.value,
                }))
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2.5 rounded-xl font-bold"
            >
            <Send className="h-4 w-4" />
            Prepare Email
            </Button>
        </form>
      )}
    </div>
  )
}