import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DragAndDropImage({
  onFileChange,
}: {
  onFileChange: (file: any) => void;
}) {
  const [file, setFile] = useState<File | undefined>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles[0]) {
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
      onFileChange(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div>
      <div
        {...getRootProps({
          className:
            'dropzone relative overflow-hidden bg-gray-50 rounded-xl p-10 cursor-pointer w-full flex flex-col gap-y-2 items-center aspect-video justify-center',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag n drop or click to select files</p>
        <small className="text-gray-900">
          Recommended Ratio: 16:9 | Format: JPG, PNG | Max size: 2MB
        </small>
        {file && (
          <>
            <img
              className="absolute top-0 right-0 left-0 bottom-0"
              src={URL.createObjectURL(file)}
              alt="deal"
            />
            <button
              className=" absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
              onClick={(e) => {
                setFile(null);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              X
            </button>
          </>
        )}
      </div>
    </div>
  );
}
