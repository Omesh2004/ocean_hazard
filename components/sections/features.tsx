import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Map, Layers, Languages, ShieldCheck, Bell } from "lucide-react"

const FEATURES = [
  {
    title: "Real-time hazard feed",
    icon: AlertTriangle,
    points: ["User reports + social signals", "Event-driven updates"],
  },
  {
    title: "Clustering & hotspots",
    icon: Map,
    points: ["Geospatial clustering", "Hotspot heatmaps"],
  },
  {
    title: "Multilingual by design",
    icon: Languages,
    points: ["Language detection", "Entity extraction"],
  },
  {
    title: "Source validation",
    icon: ShieldCheck,
    points: ["Confidence scoring", "Duplicate filtering"],
  },
  {
    title: "Layers & filters",
    icon: Layers,
    points: ["Incident types & severity", "Time windows & regions"],
  },
  {
    title: "Alerts & subscriptions",
    icon: Bell,
    points: ["Region-based alerts", "Webhooks (coming soon)"],
  },
]

export default function Features() {
  return (
    <section aria-labelledby="features" className="border-t">
      <div className="px-4 py-10 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 id="features" className="text-balance text-2xl font-semibold">
            Everything you need to monitor the water
          </h2>
          <Badge variant="secondary">Minimal • Fast • Reliable</Badge>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A focused toolkit to collect, validate, and visualize hazards — without the noise.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <Card key={f.title}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="grid gap-1.5">
                    {f.points.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
