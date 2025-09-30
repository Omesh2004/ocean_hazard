import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Nexgen. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/map" className="hover:text-foreground">
              Map
            </Link>
            <Link href="/report" className="hover:text-foreground">
              Report Hazard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
