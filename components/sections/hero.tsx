import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Waves, AlertTriangle, Map } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative">
      <div className=" grid  items-center  py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Waves className="h-3.5 w-3.5" aria-hidden />
            <span>Ocean hazard intelligence</span>
          </div>
          <h1 className="mt-4 text-pretty text-3xl font-semibold leading-tight sm:text-4xl">
            Real-time crowdsourced ocean hazard reporting, clustered on an interactive map
          </h1>
          <p className="mt-4 text-balance text-muted-foreground">
            Detect, validate, and visualize incidents across coasts and waterways. Multilingual inputs, geospatial
            clustering, and confidence scoring in one clean interface.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/map" aria-label="Open map">
              <Button size="lg" className="gap-2">
                <Map className="h-4 w-4" aria-hidden />
                Open Map
              </Button>
            </Link>
            <Link href="/report" aria-label="Report a hazard">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <AlertTriangle className="h-4 w-4" aria-hidden />
                Report Hazard
              </Button>
            </Link>
          </div>
        </div>

        <Card aria-hidden className="lg:justify-self-end">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Waves className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Crowdsourced Hazard Intelligence</p>
                <p className="text-xs text-muted-foreground">
                  Unified user reports and social signals with geospatial context
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              <li className="rounded-md border bg-card p-3">• Near real-time updates via event-driven pipelines</li>
              <li className="rounded-md border bg-card p-3">• Clustering and hotspot visualization on the map</li>
              <li className="rounded-md border bg-card p-3">• Confidence scoring and duplicate filtering</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
