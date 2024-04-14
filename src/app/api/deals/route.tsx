import { createDeal } from '@/lib/queries'
import { FORM_DEAL_SCHEMA } from '@/types/Types'
import { getXataClient } from '@/xata'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  if (!query) {
    return new Response('Bad Request', { status: 400 })
  }
  const xataClient = getXataClient()
  try {
    //TODO: how do we handle this now that we have Prisma?
    const { records } = await xataClient.db.Deal.search(query, {
      target: ['name', 'description'],
    })

    return new Response(JSON.stringify(records), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response('Bad Request', { status: 400 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  let parsed
  try {
    parsed = FORM_DEAL_SCHEMA.parse(body)
    console.log(parsed)
  } catch (error) {
    console.log('failed to parse')
    // console.error(error);
    return new Response('Bad Request', { status: 400 })
  }

  try {
    const newDeal = {
      ...parsed,
      //   image: { name: parsed.name, mediaType: 'image/png', base64Content: '' },
    }

    const createdRecord = await createDeal(newDeal)

    return new Response(JSON.stringify(createdRecord), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
