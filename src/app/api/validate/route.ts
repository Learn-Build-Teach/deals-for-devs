import { NextRequest } from 'next/server'
import { getXataClient } from '@/xata'
import { redirect } from 'next/navigation'

const client = getXataClient()

//TODO: Add error checking
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token },
  })

  if (!subscriber) {
    redirect('/')
  }

  const { id } = subscriber

  const data = await client.db.subscribers.update(id, {
    verified: true,
    status: 'subscribed',
  })

  if (!data) {
    //TODO: handle not found (return's null)
    //TODO: redirect to a new page saying error of some sort
    return
  }

  return redirect(`/preferences?token=${token}`)
}
