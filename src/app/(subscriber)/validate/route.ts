import { NextRequest } from 'next/server'
import { getXataClient } from '@/xata'
import { redirect } from 'next/navigation'

const client = getXataClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token: token },
  })

  if (!subscriber) {
    redirect('/')
  }

  const data = await client.db.subscribers.update(subscriber.id, {
    verified: true,
    status: 'subscribed',
  })

  if (data) {
    return redirect(`/preferences/${data.token}`)
  }
}
