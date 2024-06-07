import React, { useCallback, useState } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import Icon from '@/components/Icon'
import toast from 'react-hot-toast'

export default function DragAndDropImage({
  onFileChange,
}: {
  onFileChange: (file: File) => void
  handleDelete: () => void
}) {
  const [file, setFile] = useState<File | undefined>()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setFile(acceptedFiles[0])
      onFileChange(acceptedFiles[0])
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
      </div>
    </div>
  )
}
