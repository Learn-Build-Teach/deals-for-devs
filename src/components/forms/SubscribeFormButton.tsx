import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export default function SubscribeFormButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="h absolute right-1 top-1 bg-transparent pr-[19px] transition-transform hover:translate-x-0.5 md:top-4"
      disabled={pending}
      aria-label="Submit"
    >
      {
        pending ?
          // spinner animation during form submission
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-teal-500" />
          // paper airplane icon
        : <svg
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

      }
    </Button>
  )
}
