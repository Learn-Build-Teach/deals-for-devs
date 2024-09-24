'use client'
import { subscribeAction } from '@/actions/subscriber-subscribe'
import toast from 'react-hot-toast'
import SubscribeFormButton from './SubscribeFormButton'
import { useActionState, useEffect } from 'react'
import { ActionResult } from '@/types'

const initialState: ActionResult = { success: false }

export default function SubscribeForm() {
  const [serverState, formAction, pending] = useActionState(
    subscribeAction,
    initialState
  )

  useEffect(() => {
    console.log(serverState)
    if (serverState.success === false && serverState?.message) {
      toast.error(serverState.message)
    }
  }, [serverState])

  return (
    <form action={formAction}>
      <div className="relative h-11 w-full md:h-16 ">
        <input
          type="email"
          name="email"
          required
          placeholder="E-mail address"
          className="w-full rounded-md border border-white/[.67] bg-transparent p-3 pl-4  text-white md:h-[70px]  md:rounded-[16px] md:placeholder:text-white/[.47]"
        />
        <SubscribeFormButton pending={pending} />
      </div>
    </form>
  )
}
