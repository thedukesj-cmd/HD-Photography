import { getFeaturedMember, getLatestShowcase, getLatestTutorials, getLatestNews } from "@/lib/content"
import { HomeHero } from "@/components/home-hero"
import { HomeShowcase } from "@/components/home-showcase"
import { HomeAbout } from "@/components/home-about"
import { HomeTutorials } from "@/components/home-tutorials"
import { HomeNews } from "@/components/home-news"
import { HomeCTA } from "@/components/home-cta"

export default async function HomePage() {
  const featuredMember = getFeaturedMember()
  const latestShowcase = getLatestShowcase()
  const tutorials = getLatestTutorials(3)
  const news = getLatestNews(2)



  return (
    <div className="bg-zinc-950 text-zinc-100">
      <HomeHero />

      
      {latestShowcase && (
  <HomeShowcase showcase={latestShowcase} />
)}

     {featuredMember && (
  <HomeAbout featuredMember={featuredMember} />
)}
      {/* ─── Latest Tutorials ─────────────────────────────────────────── */}
     {tutorials.length > 0 && (
  <HomeTutorials tutorials={tutorials} />
)}

      {news.length > 0 && (
<HomeNews news={news} />
        )}

      {/* ─── CTA Join ─────────────────────────────────────────────────── */}
      <HomeCTA />
    </div>
  )
}
