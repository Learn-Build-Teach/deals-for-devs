import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'
import { Progress } from '@/components/ui/progress'
import { useAddDealContext } from '@/context/AddDealContext'
import { getImageUrl, deleteImage } from '@/lib/imageUpload'
import { cn } from '@/lib/utils'
import { ImageUploadStatus } from '@/types/Types'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ImageUpload() {
  const [imageUploadStatus, setImageUploadStatus] = useState<ImageUploadStatus>(
    ImageUploadStatus.PENDING
  )
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  const { updateNewDealDetails, newDealData } = useAddDealContext()

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
    }).then((res) => res.json())

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

      // update the new deal data with the image id and public url
      updateNewDealDetails({
        coverImageId: id,
        coverImageURL: imageUrl,
      })

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
    const res = await deleteImage(newDealData.coverImageId as string)
    if (!res) {
      toast.error('Failed to delete image')
      return
    }
    updateNewDealDetails({ coverImageId: '', coverImageURL: '' })
    resetProgress()
    toast.success('Image deleted successfully')
  }

  const resetProgress = () => {
    setImageUploadProgress(0)
    setImageUploadStatus(ImageUploadStatus.PENDING)
  }
  return (
    <div className="flex flex-col gap-4">
      <input
        type="hidden"
        name="coverImageURL"
        value={newDealData.coverImageURL}
      />
      <input
        type="hidden"
        name="coverImageId"
        value={newDealData.coverImageId}
      />

      <span className="text-base font-extralight md:text-2xl">Cover Image</span>
      {newDealData.coverImageURL ?
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={newDealData.coverImageURL}
            alt="Product Image"
            width={1280}
            height={720}
            className="absolute bottom-0 left-0 right-0 top-0 aspect-video w-full object-cover"
          />
          <button
            type="button"
            onClick={handleImageDelete}
            className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-black bg-opacity-50 px-3.5 py-1.5 text-white hover:bg-teal-500"
          >
            X
          </button>
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
