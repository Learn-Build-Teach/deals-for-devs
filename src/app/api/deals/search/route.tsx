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
      filter: {
        approved: true,
        //TODO: add filter for endDate
      },
    })

    //TODO: fix this hack based on weird data from search api
    const formattedRecords = records.map((record) => ({
      ...record,
      xata_id: record.id,
    }))

    return new Response(JSON.stringify(formattedRecords), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response('Bad Request', { status: 400 })
  }
}
