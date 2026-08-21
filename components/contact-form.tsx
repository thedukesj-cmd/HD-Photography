"use client"

import { useState } from "react"
import { CheckCircle, RotateCcw, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const CONTACT_EMAIL = "theduke.sj@gmail.com"

export function ContactForm() {
  const { language } = useLanguage()
  const [prepared, setPrepared] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const subject =
      form.subject.trim() ||
      (language === "vi"
        ? `Tin nhắn từ ${form.name}`
        : `Message from ${form.name}`)

    const body = [
      `${language === "vi" ? "Tên" : "Name"}: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n")

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    setPrepared(true)
    window.location.href = mailto
  }

  function resetForm() {
    setPrepared(false)
  }

  return (
    <div className="lg:col-span-3">
      {prepared ? (
        <div
          className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center"
          aria-live="polite"
        >
          <CheckCircle className="mb-5 h-12 w-12 text-amber-400" />

          <h2 className="font-playfair text-3xl font-bold text-white">
            {language === "vi"
              ? "Email đã được chuẩn bị"
              : "Your Email Is Ready"}
          </h2>

          <p className="mt-3 max-w-md leading-relaxed text-zinc-400">
            {language === "vi"
              ? "Ứng dụng email của bạn sẽ mở với nội dung đã được điền sẵn. Vui lòng kiểm tra lại và nhấn Gửi trong ứng dụng email."
              : "Your email application should open with the message already filled in. Please review it and press Send in your email application."}
          </p>

          <button
            type="button"
            onClick={resetForm}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            <RotateCcw className="h-4 w-4" />

            {language === "vi"
              ? "Quay lại biểu mẫu"
              : "Return to Form"}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8"
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
                autoComplete="name"
                value={form.name}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={
                  language === "vi"
                    ? "Tên của bạn"
                    : "Your name"
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
                autoComplete="email"
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
              {language === "vi"
                ? "Chủ đề"
                : "Subject"}
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
              {language === "vi"
                ? "Nội dung"
                : "Message"}
            </label>

            <textarea
              id="message"
              name="message"
              rows={7}
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

            {language === "vi"
              ? "Mở Ứng Dụng Email"
              : "Open Email App"}
          </Button>

          <p className="text-center text-xs leading-relaxed text-zinc-600">
            {language === "vi"
              ? "Biểu mẫu này sẽ mở ứng dụng email trên thiết bị của bạn. Tin nhắn chỉ được gửi khi bạn nhấn Gửi trong ứng dụng email."
              : "This form opens your device's email application. Your message is sent only after you press Send there."}
          </p>
        </form>
      )}
    </div>
  )
}