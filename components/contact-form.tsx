"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function ContactForm() {
  const { language } = useLanguage()
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const subject =
      form.subject ||
      (language === "vi"
        ? `Tin nhắn từ ${form.name}`
        : `Message from ${form.name}`)

    const body = [
      `${language === "vi" ? "Tên" : "Name"}: ${form.name}`,
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
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <CheckCircle className="mb-5 h-12 w-12 text-amber-400" />

          <h2 className="mb-3 font-playfair text-3xl font-bold text-white">
            {language === "vi"
              ? "Email của bạn đã sẵn sàng"
              : "Your email is ready"}
          </h2>

          <p className="max-w-sm text-zinc-400">
            {language === "vi"
              ? "Ứng dụng email của bạn sẽ mở với nội dung đã được điền sẵn. Vui lòng kiểm tra lại rồi gửi khi bạn sẵn sàng."
              : "Your email application should open with the message filled in. Review it, then send it when ready."}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500"
              >
                {language === "vi" ? "Tên" : "Name"}
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
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={
                  language === "vi" ? "Tên của bạn" : "Your name"
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500"
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
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500"
            >
              {language === "vi" ? "Chủ đề" : "Subject"}
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
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={
                language === "vi"
                  ? "Bạn muốn trao đổi về điều gì?"
                  : "What would you like to discuss?"
              }
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500"
            >
              {language === "vi" ? "Nội dung" : "Message"}
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
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={
                language === "vi"
                  ? "Viết lời nhắn của bạn tại đây..."
                  : "Write your message here..."
              }
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2.5 rounded-xl font-bold"
          >
            <Send className="h-4 w-4" />
            {language === "vi" ? "Soạn Email" : "Prepare Email"}
          </Button>
        </form>
      )}
    </div>
  )
}