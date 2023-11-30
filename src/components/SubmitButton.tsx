'use client';
import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
      disabled={pending}
    >
      Submit {pending && '...'}
    </button>
  );
}
