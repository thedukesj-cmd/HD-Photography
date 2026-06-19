# Deploying Aperture Club

## Option A — Netlify (Recommended)

Netlify has native Next.js support — no static export needed.

### Steps

1. Push this repo to GitHub
2. Import at [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
3. Choose GitHub and select this repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Click **Deploy site**

### Enable the CMS admin panel

After deploying:

1. Netlify dashboard → **Site configuration → Identity → Enable Identity**
2. Identity → **Services → Enable Git Gateway**
3. Identity → **Invite users** → enter your email
4. Visit `https://your-site.netlify.app/admin` and accept the invite email

---

## Option B — Cloudflare Pages (static export)

Cloudflare Pages requires a static export. First update `next.config.js`:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    // ...
  },
}
```

Then in Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `out`
- Use GitHub backend in `public/admin/config.yml` for CMS

---

## Local Development

```bash
npm install
npm run dev
```

### Run CMS locally

```bash
# Terminal 2:
npx decap-server
```

Uncomment `local_backend: true` in `public/admin/config.yml`.

---

## Content Structure

| Content Type | Folder | CMS Path |
|---|---|---|
| Members | `/content/members/` | Admin → Members |
| Showcase | `/content/showcase/` | Admin → Monthly Showcase |
| Tutorials | `/content/tutorials/` | Admin → Tutorials |
| News | `/content/news/` | Admin → News & Events |
