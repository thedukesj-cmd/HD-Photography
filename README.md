# 📷 Aperture Club — Photography Club Website

A modern, elegant photography club website built with **Next.js 15**, featuring a dark/light theme, image lightbox galleries, full CMS integration, and a static-site architecture ready for deployment on **Netlify** or **Cloudflare Pages**.

---

## ✨ Features

- **7 pages** — Home, About, Member Galleries, Monthly Showcase Archive, Tutorials, News, Contact
- **Image lightbox** — fullscreen gallery viewer with captions on all photo pages
- **Tutorial search** — live client-side search by title, author, tags, or difficulty
- **Dark / Light theme** — toggle in the navbar, system-aware, persists across pages
- **CMS admin panel** — non-technical editors manage all content at `/admin` (powered by [Decap CMS](https://decapcms.org))
- **SEO ready** — OpenGraph + Twitter Card metadata on every page
- **Mobile responsive** — works on all screen sizes
- **Fast** — lazy-loaded images, static generation, no database

---

## 🗂️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/
│   ├── members/            # Gallery list + member detail
│   ├── showcase/           # Monthly showcase archive + detail
│   ├── tutorials/          # Tutorial list (with search) + detail
│   ├── news/               # News list + article detail
│   └── contact/
├── components/             # Shared React components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── gallery-lightbox.tsx
│   ├── tutorial-search.tsx
│   └── ...
├── content/                # All CMS content (Markdown files)
│   ├── members/
│   ├── showcase/
│   ├── tutorials/
│   └── news/
├── lib/
│   └── content.ts          # Markdown content loading utilities
├── public/
│   └── admin/              # Decap CMS admin panel
│       ├── index.html
│       └── config.yml
├── next.config.js
├── tailwind.config.ts
└── DEPLOYMENT.md           # Full deployment guide
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js 18+](https://nodejs.org)
- [Git](https://git-scm.com)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run CMS locally (optional)

```bash
# In a second terminal:
npx decap-server
```

Then uncomment `local_backend: true` in `public/admin/config.yml` and visit [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 📝 Managing Content

All content lives as **Markdown files** in the `/content` directory and can be edited in two ways:

### Via the CMS Admin Panel
Visit `/admin` on your deployed site. Requires Netlify Identity (see deployment guide).

| Section | CMS Path |
|---|---|
| Members & Galleries | Admin → Members |
| Monthly Showcase | Admin → Monthly Showcase |
| Tutorials | Admin → Tutorials |
| News & Events | Admin → News & Events |

### By editing files directly
Each content type uses Markdown with YAML frontmatter:

```
content/
  members/your-member.md
  showcase/2024-04.md
  tutorials/your-tutorial.md
  news/your-article.md
```

---

## 🌐 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full instructions.

**Quick summary:**

### Netlify (recommended)
1. Push this repo to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build` · Publish directory: `out`
4. Enable Netlify Identity + Git Gateway for CMS access

### Cloudflare Pages
1. Connect repo at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Build command: `npm run build` · Output directory: `out`
3. Use GitHub backend in `public/admin/config.yml` for CMS

> Before deploying, uncomment in `next.config.js`:
> ```js
> output: 'export',
> trailingSlash: true,
> ```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| CMS | [Decap CMS](https://decapcms.org) |
| Content | Markdown + YAML frontmatter |
| Lightbox | [yet-another-react-lightbox](https://yet-another-react-lightbox.com) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Markdown | [remark](https://github.com/remarkjs/remark) + remark-html |

---

## 📄 License

MIT — free to use and modify for your photography club.
