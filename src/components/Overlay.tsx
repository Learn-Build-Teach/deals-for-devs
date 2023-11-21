'use client';

import { ReactNode } from 'react';

const Overlay = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={`fixed inset-0  p-10 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      } z-50 bg-gray-950/[.90] `}
    >
      <div className="bg-gray-900 max-w-2xl relative w-full h-full p-4 rounded-lg shadow-lg border-4 border-gray-200 pt-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
