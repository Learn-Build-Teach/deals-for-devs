'use client'
import toast from 'react-hot-toast'
import SubmitButton from '../SubmitButton'
import Input from '../../forms/add-a-deal/Input'
import { createAdminUserAction } from '@/actions/dashboard/adminUser'
import { useRef } from 'react'

const initialState = {}
export default function NewAdminForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      id="new-admin-form"
      ref={formRef}
      action={async (formData) => {
        const res = await createAdminUserAction(formData)
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
          <Input label="User Id" name="userId" type="text" required={true} />
        </div>
        <SubmitButton text="Submit" handleClick={() => {}} />
      </div>
    </form>
  )
}
