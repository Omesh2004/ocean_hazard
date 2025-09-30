import MapComponent from "../../components/acident-map"
import AccidentMap from "../../components/acident-map"

export default function MapPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-12">
      <header className="mb-6 md:mb-8">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Ocean Incidents Map
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Explore recent sample incidents across global waters. Hover markers for details and use “Locate me” to jump
          near your current area. Scroll or use controls to zoom.
        </p>
      </header>

      <section aria-label="Interactive map showing sample accidents">
       
      </section>
    </main>
  )
}
