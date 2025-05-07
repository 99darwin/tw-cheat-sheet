"use client"

import { generateReactHelpers } from "@uploadthing/react"
import { ourFileRouter } from "@/lib/uploadthing"

export const { useUploadThing, uploadFiles } = generateReactHelpers<typeof ourFileRouter>()

export function UploadThingProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 