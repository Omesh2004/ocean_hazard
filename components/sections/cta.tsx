import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section aria-labelledby="get-started" className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center lg:px-8">
        <h2 id="get-started" className="text-pretty text-2xl font-semibold">
          Get started in seconds
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          Explore the live hazard map or submit a new incident. No sign-up required for reporting.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/map">
            <Button size="lg">Open Map</Button>
          </Link>
          <Link href="/report">
            <Button size="lg" variant="outline" className="bg-transparent">
              Report Hazard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
