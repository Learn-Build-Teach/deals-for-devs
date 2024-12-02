import React, { useCallback, useState } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import Icon from '@/components/Icon'
import toast from 'react-hot-toast'

function is16by9Ratio(image: HTMLImageElement) {
  const ratio = image.width / image.height
  return Math.abs(ratio - 16 / 9) < 0.01 // Allow a small tolerance
}

export default function DragAndDropImage({
  onFileChange,
}: {
  onFileChange: (file: File) => void
  handleDelete: () => void
}) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return
      const file = acceptedFiles[0]

      //* custom validation for aspect ratio
      const img = await loadImage(file)

      if (!is16by9Ratio(img)) {
        return toast.error('Image should be in 16:9 aspect ratio')
      }
      //validation passed
      onFileChange(file)
    },
    [onFileChange]
  )

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[], event: DropEvent) => {
      const fileRejection = fileRejections[0]
      const fileError = fileRejection.errors[0]
      if (fileError.code === 'file-too-large') {
        toast.error('File is too large. Max file size is 2MB')
      }
    },
    []
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
  })

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Failed to load image'))
    })
  }

  return (
    <div className="">
      <div
        {...getRootProps({
          className:
            'dropzone dropzone-border relative overflow-hidden rounded-xl bg-transparent p-10 cursor-pointer w-full flex flex-col gap-y-4 items-center aspect-video justify-center',
        })}
      >
        <input {...getInputProps()} />
        <Icon id="frame" size={58} />

        <p className="text-base md:text-xl">
          Drag ‘n’ drop or click to upload an image
        </p>
        <p className="text-sm font-extralight text-white md:text-lg">
          Formats: PNG, JPEG (2mb max)
        </p>
        <p className="text-sm font-extralight text-white md:text-lg">
          Image Ratio: 16:9
        </p>
      </div>
    </div>
  )
}
