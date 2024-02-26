import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { getOneSubscriber } from '@/lib/queries'
import { createPreferencesLink } from '@/lib/utils'
import { updateSubscriberToVerified } from '@/lib/queries'

//TODO: Add error checking
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    redirect('/')
  }

  const subscriber = await getOneSubscriber(token)

  if (!subscriber) {
    redirect('/')
  }

  const { id } = subscriber

  const data = await updateSubscriberToVerified(id)

  if (!data) {
    //TODO: handle not found (return's null)
    //TODO: redirect to a new page saying error of some sort
    return
  }

  return redirect(createPreferencesLink(token))
}
