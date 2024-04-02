import { z } from 'zod'
import { getXataClient } from '@/xata'

const schema = z.array(
  z.object({
    name: z.string(),
    folder: z.string(),
    fileName: z.string(),
  })
)

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  const xataClient = getXataClient()
  let parsed
  try {
    parsed = schema.parse(body)
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
    })
  }

  const newVideos = parsed.map((video) => {
    return {
      ...video,
      video: {
        name: video.fileName,
        mediaType: 'video/mp4',
        base64Content: '',
      },
    }
  })

  try {
    const createdVideos = await xataClient.db.UserVideo.create(newVideos, [
      'video.uploadUrl',
    ])
    return new Response(JSON.stringify(createdVideos), {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    })
  }
}
