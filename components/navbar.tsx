"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ReportHazardDialog } from "@/components/report-hazard-dialog"

const NAV = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto font-bold flex h-14  items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Nexgen home">
          <div className="h-6 w-6 rounded-md bg-primary" aria-hidden />
          <span className="font-semibold">HazardWatch</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "rounded-md transition-transform hover:scale-[1.02]",
                    isActive ? "" : "text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
          <ReportHazardDialog triggerClassName="rounded-md transition-transform hover:scale-[1.02]" />
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/map">
            <Button variant="default" className="transition-transform hover:scale-[1.02]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
