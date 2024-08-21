import { SignIn, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { userId } = auth()
  if (userId) {
    return redirect('/admin/dashboard')
  }

  return (
    <main className="flex justify-center">
      <SignIn />
    </main>
  )
}
