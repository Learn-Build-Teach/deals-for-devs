import { env } from '@/env'
import { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')
  if (secret !== env.REVALIDATE_SECRET) {
    return Response.json(
      { message: 'Invalid token' },
      {
        status: 401,
      }
    )
  }

  if (!path) {
    return Response.json(
      { message: 'Missing path' },
      {
        status: 400,
      }
    )
  }

  try {
    revalidatePath(path)
    return Response.json({ revalidated: true })
  } catch (err) {
    return Response.json(
      { error: 'Error revalidating' },
      {
        status: 500,
      }
    )
  }
}
