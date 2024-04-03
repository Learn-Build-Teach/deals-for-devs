import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Icon from '@/components/Icon'

export default function DragAndDropImage({
  onFileChange,
  handleDelete,
}: {
  onFileChange: (file: any) => void
  handleDelete: () => void
}) {
  const [file, setFile] = useState<File | undefined>()

  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      // Do something with the file
      console.log(acceptedFile[0])
      setFile(acceptedFile[0])
      onFileChange(acceptedFile[0])
    },
    [onFileChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
  })

  return (
    <div className="">
      <span className="text-2xl font-extralight">Cover Image</span>
      <div
        {...getRootProps({
          className:
            'dropzone dropzone-border mt-2 relative overflow-hidden rounded-xl bg-transparent p-10 cursor-pointer w-full flex flex-col gap-y-4 items-center aspect-video justify-center',
        })}
      >
        <input {...getInputProps()} />
        <Icon id="frame" size={58} />
        <p className="text-xl">Drag ‘n’ drop or click to upload an image</p>
        <p className="text-lg font-extralight text-white">
          PNG, JPEG files accepted
        </p>
        {file && (
          <>
            <Image
              className="absolute bottom-0 left-0 right-0 top-0 h-auto w-full"
              src={URL.createObjectURL(file)}
              alt="deal"
              width={540}
              height={300}
            />
            <button
              className=" absolute right-2 top-2 rounded-full bg-black px-2 py-1 text-white"
              onClick={(e) => {
                setFile(undefined)
                handleDelete()
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              X
            </button>
          </>
        )}
      </div>
    </div>
  )
}
