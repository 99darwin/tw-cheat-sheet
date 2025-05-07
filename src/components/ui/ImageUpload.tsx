"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { useUploadThing } from "@/components/providers/UploadThingProvider"
import { Button } from "./Button"
import Image from "next/image"

interface ImageUploadProps {
  onChange: (url: string) => void
  value?: string
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { startUpload } = useUploadThing("imageUploader")

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true)
        const res = await startUpload(acceptedFiles)
        if (res?.[0]) {
          onChange(res[0].ufsUrl)
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, startUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Token image"
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-zinc-900"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            cursor-pointer transition-colors
            ${isDragActive ? "border-purple-500 bg-purple-500/10" : "border-zinc-800 hover:border-zinc-700"}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 text-zinc-400 mb-2" />
          <p className="text-sm text-zinc-400 text-center">
            {isUploading
              ? "Uploading..."
              : isDragActive
              ? "Drop the image here"
              : "Drag & drop an image, or click to select"}
          </p>
        </div>
      )}
    </div>
  )
} 