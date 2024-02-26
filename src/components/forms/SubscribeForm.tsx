'use client'
import React from 'react'
import { subscribe } from '@/actions/subscriber-subscribe'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { createConfirmEmailLink } from '@/lib/utils'

export default function SubscribeForm() {
  return (
    <form
      id="subscribe-form"
      action={async (formData) => {
        const { data: token, error } = await subscribe(formData)
        if (error) {
          console.error(error)
          return toast.error(error)
        }

        if (!token) {
          return toast.error('Failed to subscribe')
        }

        const form = document.getElementById(
          'subscribe-form'
        ) as HTMLFormElement
        form.reset()
        // route subscriber to confirm page
        const confirmEmailLink = createConfirmEmailLink(token)
        redirect(confirmEmailLink)
      }}
    >
      <div className="relative h-[44.36px] w-[303px] md:h-[70px] md:w-[476px]">
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          className="w-full rounded-md border border-white/[.67] bg-transparent p-3 pl-4  text-white md:h-[70px] md:w-[476px] md:rounded-[16px] md:placeholder:text-white/[.47]"
        />
        <button
          type="submit"
          className="h absolute right-1 top-4 pr-[19px] hover:translate-x-1 md:top-6"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-inherit md:h-inherit h-[15.21px] w-[15.21px] md:h-6 md:w-6"
          >
            <path
              d="M4.00004 10L1.26904 1.125C7.80191 3.025 13.9624 6.02646 19.485 10C13.9627 13.9735 7.80257 16.9749 1.27004 18.875L4.00004 10ZM4.00004 10H11.5"
              stroke="#14B8A6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
