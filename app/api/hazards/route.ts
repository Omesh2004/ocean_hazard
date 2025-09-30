import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const dataFile = path.join(process.cwd(), "data", "hazards.json")

async function ensureFile() {
  try {
    await fs.access(dataFile)
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true })
    await fs.writeFile(dataFile, "[]", "utf8")
  }
}

export async function GET() {
  try {
    await ensureFile()
    const raw = await fs.readFile(dataFile, "utf8")
    const hazards = JSON.parse(raw)
    return NextResponse.json(hazards)
  } catch (e: any) {
    return new NextResponse(e?.message || "Failed to read hazards", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await ensureFile()
    const payload = await req.json()
    const raw = await fs.readFile(dataFile, "utf8")
    const list = JSON.parse(raw)
    list.push(payload)
    await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8")
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return new NextResponse(e?.message || "Failed to save hazard", { status: 500 })
  }
}
