import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { incrementDealClicks } from '@/lib/queries'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const id = searchParams.get('id')
  console.log(url, id)
  if (!url || !id) {
    redirect('/')
  }

  try {
    await incrementDealClicks(id)
  } catch (error) {
    console.error(error)
  } finally {
    return redirect(url)
  }
}
