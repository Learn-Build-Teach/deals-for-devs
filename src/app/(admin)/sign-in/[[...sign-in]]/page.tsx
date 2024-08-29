import { SignIn, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { userId } = auth()
  if (userId) {
    return redirect('/dashboard')
  }

  return (
    <main className="flex justify-center">
      <SignIn />
    </main>
  )
}
