import { z } from 'zod'
import { getXataClient } from '@/xata'
import { v4 as uuidv4 } from 'uuid'

const schema = z.object({
  fileName: z.string(),
  mediaType: z.string(),
})

export async function PUT(req: Request, res: Response) {
  const body = await req.json()
  const xataClient = getXataClient()

  console.log(body)

  let parsed

  try {
    parsed = schema.parse(body)
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
    })
  }

  try {
    console.log('Creating uuid')
    const id = uuidv4()
    console.log('Created uuid: ', id)
    console.log('Creating image')
    const record = await xataClient.db.DealImage.create(
      id,
      {
        image: {
          name: parsed.fileName,
          mediaType: parsed.mediaType,
          base64Content: '',
        },
      },
      ['*', 'image.uploadUrl']
    )
    console.log(record)
    return new Response(JSON.stringify(record), {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    })
  }
}
