export async function POST(request: Request) {
  const body = await request.json()
  console.log('TEST hit /api/admin/sendNewDeal POST')
  console.log(body)

  try {
    return new Response('TEST hit /api/admin/sendNewDeal POST', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Bad Request', { status: 400 })
  }
}

export function GET(request: Request) {
  console.log('TEST hit /api/admin/sendNewDeal GET')

  return new Response('TEST hit /api/admin/sendNewDeal GET', {
    headers: { 'content-type': 'application/json' },
  })
}
