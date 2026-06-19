import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Users, BookOpen, Image as ImageIcon } from "lucide-react"
import { getAllMembers, getFeaturedMember, getLatestShowcase, getLatestTutorials, getLatestNews } from "@/lib/content"
import { MemberCard } from "@/components/member-card"
import { ShowcaseCard } from "@/components/showcase-card"
import { NewsCard } from "@/components/news-card"
import type { Tutorial } from "@/types"

export default async function HomePage() {
  const featuredMember = getFeaturedMember()
  const latestShowcase = getLatestShowcase()
  const tutorials = getLatestTutorials(3)
  const news = getLatestNews(2)
  const allMembers = getAllMembers()

  const stats = [
    { icon: Users, label: "Members", value: `${allMembers.length}+` },
    { icon: Camera, label: "Photos Shared", value: "2,400+" },
    { icon: BookOpen, label: "Tutorials", value: "40+" },
    { icon: ImageIcon, label: "Showcases", value: "36" },
  ]

  return (
    <div className="bg-zinc-950 text-zinc-100">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
            alt="Mountain landscape at golden hour"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            HD Photography Club
          </p>
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
            Where Light<br />
            <em className="text-amber-400 not-italic">Tells Stories</em>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A community of passionate photographers who believe that every frame is a chance to see the world differently — and share that vision with others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/members"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              Explore Galleries <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-zinc-500 hover:border-white text-zinc-300 hover:text-white font-medium px-8 py-4 rounded-full transition-all duration-200"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-transparent mx-auto" />
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                <div className="font-playfair text-3xl font-bold text-white">{value}</div>
                <div className="text-zinc-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Showcase ────────────────────────────────────────── */}
      {latestShowcase && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Monthly Showcase</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">
                  {latestShowcase.month} {latestShowcase.year}
                </h2>
                <p className="text-zinc-400 mt-2 italic text-lg">Theme: {latestShowcase.theme}</p>
              </div>
              <Link
                href={`/showcase/${latestShowcase.slug}`}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors shrink-0"
              >
                View full showcase <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {latestShowcase.photos.slice(0, 6).map((photo, i) => (
                <Link
                  key={i}
                  href={`/showcase/${latestShowcase.slug}`}
                  className={`relative overflow-hidden rounded-lg group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.title || "Photo"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-4">
                    <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">{photo.title}</span>
                    <span className="text-zinc-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{photo.photographer}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Featured Member ──────────────────────────────────────────── */}
      {featuredMember && (
        <section className="py-20 bg-zinc-900/40 border-y border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-10 text-center">Featured Member</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={featuredMember.profilePhoto}
                    alt={featuredMember.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Gallery preview strip */}
                {featuredMember.galleryPhotos.length > 0 && (
                  <div className="absolute -bottom-6 left-4 right-4 flex gap-2">
                    {featuredMember.galleryPhotos.slice(0, 3).map((p, i) => (
                      <div key={i} className="relative flex-1 aspect-square rounded-lg overflow-hidden border-2 border-zinc-950 shadow-xl">
                        <Image src={p.url} alt="" fill className="object-cover" sizes="10vw" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:pl-4 pt-8 md:pt-0">
                <div className="space-y-4">
                  <p className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">
                    {featuredMember.name}
                  </p>
                  {featuredMember.specialties && (
                    <p className="text-amber-400 font-medium tracking-wide">
                      {featuredMember.specialties.join(" · ")}
                    </p>
                  )}
                  <p className="text-zinc-400 text-lg leading-relaxed">{featuredMember.bio}</p>
                  <Link
                    href={`/members/${featuredMember.slug}`}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors group mt-4"
                  >
                    View gallery <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Latest Tutorials ─────────────────────────────────────────── */}
      {tutorials.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Learn & Grow</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">Latest Tutorials</h2>
              </div>
              <Link href="/tutorials" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors shrink-0">
                All tutorials <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorials.map(tutorial => (
                <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="group block">
                  <article className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={tutorial.featuredImage}
                        alt={tutorial.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-xs text-amber-400/80 font-medium uppercase tracking-wide">{tutorial.difficulty}</span>
                      <h3 className="font-playfair text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">{tutorial.title}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">{tutorial.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Latest News ──────────────────────────────────────────────── */}
      {news.length > 0 && (
        <section className="py-20 bg-zinc-900/40 border-t border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Stay Updated</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold">News & Events</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors shrink-0">
                All news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map(item => <NewsCard key={item.slug} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Join ─────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
            alt="Forest light"
            fill
            className="object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to share your vision?
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Join a community of photographers who are as passionate about the art as you are. 
            Monthly meetups, workshops, critique sessions, and a showcase that celebrates every perspective.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-10 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 text-lg"
          >
            Get in Touch <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
