"use client"

import type * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type HazardPayload = {
  id: string
  title: string
  description: string
  category: string
  severity: string
  latitude: number | null
  longitude: number | null
  imageUrl?: string
  createdAt: string
  source: "manual" | "geolocation"
}

export function ReportHazardDialog({
  triggerClassName,
}: {
  triggerClassName?: string
}) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<string>("")
  const [severity, setSeverity] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [source, setSource] = useState<"manual" | "geolocation">("manual")

  const useCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({ title: "Geolocation unavailable", description: "Your browser does not support location access." })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setLatitude(String(lat))
        setLongitude(String(lng))
        setSource("geolocation")
        toast({ title: "Location captured", description: "We filled your coordinates from your current location." })
      },
      (err) => {
        toast({ title: "Location error", description: err.message })
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !category || !severity) {
      toast({ title: "Missing fields", description: "Please fill title, description, category, and severity." })
      return
    }

    const latNum = latitude ? Number(latitude) : null
    const lngNum = longitude ? Number(longitude) : null
    if (latNum !== null && (isNaN(latNum) || latNum < -90 || latNum > 90)) {
      toast({ title: "Invalid latitude", description: "Latitude must be a number between -90 and 90." })
      return
    }
    if (lngNum !== null && (isNaN(lngNum) || lngNum < -180 || lngNum > 180)) {
      toast({ title: "Invalid longitude", description: "Longitude must be a number between -180 and 180." })
      return
    }

    const payload: HazardPayload = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      severity,
      latitude: latNum,
      longitude: lngNum,
      imageUrl: imageUrl || undefined,
      createdAt: new Date().toISOString(),
      source,
    }

    try {
      setLoading(true)
      const res = await fetch("/api/hazards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to submit hazard")
      }
      toast({ title: "Hazard reported", description: "Thanks for contributing to safer oceans." })
      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setSeverity("")
      setLatitude("")
      setLongitude("")
      setImageUrl("")
      setSource("manual")
      setOpen(false)
    } catch (err: any) {
      toast({ title: "Submit failed", description: err?.message || "Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={triggerClassName}
          // subtle animation
        >
          Report Hazard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg animate-in fade-in-0 zoom-in-95 duration-200">
        <DialogHeader>
          <DialogTitle className="text-pretty">Report an Ocean Hazard</DialogTitle>
          <DialogDescription>Share details to alert others and improve safety.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 pt-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., High waves near Marina"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add useful context, photos, or warnings."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-waves">High Waves</SelectItem>
                  <SelectItem value="storm">Storm</SelectItem>
                  <SelectItem value="rip-current">Rip Current</SelectItem>
                  <SelectItem value="debris">Debris</SelectItem>
                  <SelectItem value="pollution">Pollution</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Location</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Latitude"
                inputMode="decimal"
                value={latitude}
                onChange={(e) => {
                  setLatitude(e.target.value)
                  setSource("manual")
                }}
              />
              <Input
                placeholder="Longitude"
                inputMode="decimal"
                value={longitude}
                onChange={(e) => {
                  setLongitude(e.target.value)
                  setSource("manual")
                }}
              />
              <Button type="button" variant="secondary" onClick={useCurrentLocation}>
                Use my location
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              You can enter coordinates manually or let the browser fill your current location.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="transition-transform duration-200 hover:scale-[1.01]">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
