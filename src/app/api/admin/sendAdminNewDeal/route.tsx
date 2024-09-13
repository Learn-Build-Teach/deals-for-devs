import { inngest } from '@/utils/inngest/client'

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { ids } = await inngest.send({
      name: 'admin/new-deal-created',
      data: {
        dealId: body.dealId,
      },
    })
    return new Response(JSON.stringify(ids), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Bad Request', { status: 400 })
  }
}
