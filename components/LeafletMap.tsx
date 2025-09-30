"use client"

import { useEffect, useMemo, useState } from "react"
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import type { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet'

// Fix: Leaflet's default icon path for Vite
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

type Severity = "low" | "medium" | "high" | "critical"
type Accident = {
  id: string
  lat: number
  lng: number
  type: string
  severity: Severity
  timestamp: string
  source: string
  description: string
}

const severityColor = (sev: Severity): string => {
  switch (sev) {
    case "low":
      return "#14b8a6"
    case "medium":
      return "#0ea5e9"
    case "high":
      return "#f59e0b"
    case "critical":
      return "#ef4444"
    default:
      return "#14b8a6"
  }
}

interface LeafletMapProps {
  heightClass?: string
  accidents?: Accident[]
  DUMMY_ACCIDENTS: Accident[]
}

function LeafletMap({ heightClass = "h-[70vh]", accidents, DUMMY_ACCIDENTS }: LeafletMapProps) {
  const [mounted, setMounted] = useState(false)
  const data = useMemo(() => accidents ?? DUMMY_ACCIDENTS, [accidents, DUMMY_ACCIDENTS])
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`relative w-full ${heightClass} flex items-center justify-center bg-card border rounded-xl`}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${heightClass}`}>
      <MapContainer
        center={[20, 0]}
        zoom={3}
        minZoom={2}
        scrollWheelZoom
        className="h-full w-full rounded-xl border bg-card"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((a) => (
          <CircleMarker
            key={a.id}
            center={[a.lat, a.lng]}
            pathOptions={{
              color: severityColor(a.severity),
              fillColor: severityColor(a.severity),
              fillOpacity: 0.25,
              weight: hovered === a.id ? 3 : 2,
            }}
            radius={hovered === a.id ? 10 : 7}
            eventHandlers={{
              mouseover: () => setHovered(a.id),
              mouseout: () => setHovered(null),
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky>
              <div className="min-w-48 text-sm leading-5">
                <div className="font-medium text-foreground">{a.type}</div>
                <div className="text-muted-foreground">
                  Severity:{" "}
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: severityColor(a.severity) }}
                    />
                    {a.severity}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {new Date(a.timestamp).toLocaleString()}
                </div>
                <div className="mt-1 text-foreground">{a.description}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Source: {a.source}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border bg-card/95 px-3 py-2 shadow">
        <div className="text-xs font-medium text-muted-foreground">Legend</div>
        <div className="mt-1 flex items-center gap-3 text-sm">
          {(["low", "medium", "high", "critical"] as const).map((severity) => (
            <span key={severity} className="inline-flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: severityColor(severity) }}
              />
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeafletMap