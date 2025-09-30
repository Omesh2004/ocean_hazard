import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import Stats from "@/components/sections/stats"
import Features from "@/components/sections/features"
import HowItWorks from "@/components/sections/how-it-works"
import CTA from "@/components/sections/cta"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
