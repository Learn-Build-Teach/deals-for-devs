import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Icon from '@/components/Icon'

export default function DragAndDropImage({
  onFileChange,
}: {
  onFileChange: (file: any) => void
}) {
  const [file, setFile] = useState<File | undefined>()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      if (acceptedFiles[0]) {
        console.log(acceptedFiles)
        setFile(acceptedFiles[0])
        onFileChange(acceptedFiles[0])
      }
    },
    [onFileChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 2 * 1024 * 1024,
  })

  return (
    <div className="">
      <span className="text-2xl font-extralight">Cover Image</span>
      <div
        {...getRootProps({
          className:
            'dropzone -mt-3 relative overflow-hidden bg-transparent bg-dropzone-md bg-no-repeat p-10 cursor-pointer w-full flex flex-col gap-y-4 items-center aspect-video justify-center',
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
              className="absolute bottom-0 left-0 right-0 top-0"
              src={URL.createObjectURL(file)}
              alt="deal"
              layout="fill"
            />
            <button
              className=" absolute right-2 top-2 rounded bg-black px-2 py-1 text-white"
              onClick={(e) => {
                setFile(undefined)
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
