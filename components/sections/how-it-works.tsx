import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const STEPS = [
  { step: "1", title: "Ingest", text: "Collect user reports and public social signals." },
  { step: "2", title: "Detect", text: "Identify hazard type, language, and relevant entities." },
  { step: "3", title: "Validate", text: "Score confidence, remove duplicates, cross-check context." },
  { step: "4", title: "Visualize", text: "Cluster incidents on the map and reveal hotspots." },
  { step: "5", title: "Notify", text: "Trigger alerts and downstream integrations." },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="border-t">
      <div className="px-4 py-10 lg:px-8">
        <h2 id="how-it-works" className="text-balance text-2xl font-semibold">
          How it works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A streamlined flow from raw reports to actionable, geospatial insights.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <Card key={s.step}>
              <CardHeader className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm">
                  {s.step}
                </span>
                <CardTitle className="text-base">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
