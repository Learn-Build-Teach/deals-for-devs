'use client'
import toast from 'react-hot-toast'
import SubmitButton from '../SubmitButton'
import Input from '../../forms/add-a-deal/Input'

import { useRef } from 'react'
import { createSubscriberAction } from '@/actions/dashboard/subscriber'

const initialState = {}
export default function NewSubscriberForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      id="subscribe-form"
      ref={formRef}
      action={async (formData) => {
        const res = await createSubscriberAction(formData)
        if (res.message) {
          if (res.success) {
            toast.success(res.message)
            formRef.current?.reset()
          } else {
            toast.error(res.message)
          }
        }
      }}
    >
      <div className="">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Input label="Email" name="email" type="email" required={true} />
        </div>
        <SubmitButton text="Submit" handleClick={() => {}} />
      </div>
    </form>
  )
}
