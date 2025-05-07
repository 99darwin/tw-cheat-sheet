import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { userId: "user" }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)
      return { url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 