import { reportDealAction } from '@/actions/reports'
import Input from '@/components/forms/add-a-deal/Input'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import Overlay from '@/components/Overlay'
import { Button } from '@/components/ui/button'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'

interface ReportDealPopupProps {
  isOpen: boolean
  dealId: string
  onClose: () => void
}
export default function ReportDealPopup({
  isOpen,
  dealId,
  onClose,
}: ReportDealPopupProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    const reason = formData.get('reason') as string
    const email = formData.get('email') as string
    const res = await reportDealAction(dealId, reason, email)
    if (res.message) {
      if (res.success) {
        formRef.current?.reset()
        onClose()
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    }
  }

  return (
    <Overlay isOpen={isOpen} className="bg-white" onClose={onClose}>
      <p className="mb-2 text-2xl text-black">Report an issue</p>
      <p className="mb-6 text-gray-800">
        Please provide us with more info on why you want to report this deal.
      </p>
      <form action={handleSubmit} className="grid gap-y-8" ref={formRef}>
        <Input label="Email" name="email" required />
        <Textarea label="Reason" name="reason" required />
        <Button variant="light-destructive">Report this deal</Button>
      </form>
    </Overlay>
  )
}
