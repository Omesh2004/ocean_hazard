import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const STATS = [
  { value: "12k+", label: "Reports processed" },
  { value: "50+", label: "Coastal regions covered" },
  { value: "18", label: "Languages supported" },
  { value: "<2 min", label: "Avg. triage time" },
]

export default function Stats() {
  return (
    <section aria-labelledby="platform-stats" className="border-t">
      <div className=" px-4 py-10 lg:px-8">
        <h2 id="platform-stats" className="text-balance text-2xl font-semibold">
          Built for scale and speed
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Operational metrics that matter for emergency awareness and response.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <CardTitle className="text-2xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.label}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
