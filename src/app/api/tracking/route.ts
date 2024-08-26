import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { createDealView } from '@/queries/dealView'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const id = searchParams.get('id')
  if (!url || !id) {
    redirect('/')
  }

  try {
    await createDealView(id)
  } catch (error) {
    console.error(error)
  } finally {
    return redirect(url)
  }
}
