'use client'
import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getImageUrl, deleteImage } from '@/lib/imageUpload'
import { cn } from '@/lib/utils'
import { ImageUploadStatus } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  onImageUploaded: (coverImageId: string, coverImageURL: string) => void
  onImageDeleted: (coverImageId: string) => void
  initialCoverImageURL?: string
  initialCoverImageId?: string
  shouldResetData?: boolean
}
export default function ImageUpload({
  onImageUploaded,
  onImageDeleted,
  initialCoverImageURL = '',
  initialCoverImageId = '',
  shouldResetData = false,
}: ImageUploadProps) {
  const [imageUploadStatus, setImageUploadStatus] = useState<ImageUploadStatus>(
    ImageUploadStatus.PENDING
  )
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  const [coverImageId, setCoverImageId] = useState(initialCoverImageId)
  const [coverImageURL, setCoverImageURL] = useState(initialCoverImageURL)

  useEffect(() => {
    if (shouldResetData) {
      setCoverImageId('')
      setCoverImageURL('')
    }
  }, [shouldResetData])

  const handleImageUpload = async (file: File) => {
    setImageUploadStatus(ImageUploadStatus.UPLOADING)

    // get the image upload url from xata
    const { id, uploadUrl } = await fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
        mediaType: file.type,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Failed to create image record', error)
        resetProgress()
      })
    if (!uploadUrl) {
      resetProgress()
      toast.error('Failed to create image record')
      throw new Error("Couldn't create image record")
    }

    setImageUploadProgress(33)

    // upload the image to the upload url provided by xata
    try {
      const res = await fetch(uploadUrl, { method: 'PUT', body: file })

      if (!res.ok) {
        toast.error('Failed to upload image')
        throw new Error('Failed to upload image')
      }

      // get the image public url after it is uploaded to xata
      const imageUrl = await getImageUrl(id)

      if (!imageUrl) {
        setImageUploadStatus(ImageUploadStatus.PENDING)
        toast.error('Failed to get image url')
        throw new Error('Failed to get image url')
      }

      setImageUploadProgress(66)
      onImageUploaded(id, imageUrl)
      setCoverImageId(id)
      setCoverImageURL(imageUrl)

      toast.success('Image uploaded successfully')
      setImageUploadProgress(100)
      setImageUploadStatus(ImageUploadStatus.UPLOADED)
    } catch (error) {
      // Delete the record if the upload fails
      await deleteImage(id)
      toast.error("Couldn't upload image.  Image deleted!")
      resetProgress()
    }
  }

  const handleImageDelete = async () => {
    await deleteImage(coverImageId as string)

    setCoverImageId('')
    setCoverImageURL('')

    onImageDeleted(coverImageId as string)
    resetProgress()
    toast.success('Image deleted successfully')
  }

  const resetProgress = () => {
    setImageUploadProgress(0)
    setImageUploadStatus(ImageUploadStatus.PENDING)
  }
  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name="coverImageURL" value={coverImageURL} />
      <input type="hidden" name="coverImageId" value={coverImageId} />

      <span className="text-base font-extralight md:text-2xl">Cover Image</span>
      {coverImageURL ?
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={coverImageURL}
            alt="Product Image"
            width={1280}
            height={720}
            className="absolute bottom-0 left-0 right-0 top-0 aspect-video w-full object-cover"
          />
          <Button
            onClick={handleImageDelete}
            className="absolute right-2 top-2 "
          >
            X
          </Button>
        </div>
      : <>
          <DragAndDropImage
            onFileChange={(file) => {
              handleImageUpload(file)
            }}
            handleDelete={handleImageDelete}
          />

          <Progress
            value={imageUploadProgress}
            className={cn(
              imageUploadStatus === ImageUploadStatus.UPLOADING ?
                'w-full'
              : 'hidden'
            )}
          />
        </>
      }
    </div>
  )
}
