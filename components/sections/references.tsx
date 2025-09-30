import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const REFS = [
  {
    name: "IEEE – Deep Learning for Ocean Hazards",
    url: "https://ieeexplore.ieee.org/document/9308441",
  },
  {
    name: "Applications of AI in Disaster Management (ACM)",
    url: "https://dl.acm.org/doi/10.1145/3669754.3669802",
  },
  {
    name: "OceanGPT: A Large Language Model for Ocean Science Tasks",
    url: "https://aclanthology.org/2024.acl-long.184/",
  },
]

export default function References() {
  return (
    <section id="references" aria-labelledby="references-title" className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle id="references-title">Research & References</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 text-sm">
              {REFS.map((ref) => (
                <li key={ref.url} className="text-muted-foreground">
                  •{" "}
                  <Link href={ref.url} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
                    {ref.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
