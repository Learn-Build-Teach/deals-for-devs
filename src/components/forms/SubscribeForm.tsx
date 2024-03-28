'use client'
import { subscribe } from '@/actions/subscriber-subscribe'
import { createConfirmEmailLink } from '@/lib/utils'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import SubscribeFormButton from './SubscribeFormButton'

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
      <div className="relative h-11 w-80 md:h-16 md:w-[476px]">
        <input
          type="email"
          name="email"
          placeholder="E-mail address"
          className="w-full rounded-md border border-white/[.67] bg-transparent p-3 pl-4  text-white md:h-[70px] md:w-[476px] md:rounded-[16px] md:placeholder:text-white/[.47]"
        />
        <SubscribeFormButton />
      </div>
    </form>
  )
}
