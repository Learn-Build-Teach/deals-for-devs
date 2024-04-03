'use server'
import { getXataClient } from '@/xata'
import { v4 as uuidv4 } from 'uuid'
const xata = getXataClient()

export const createImage = async (mediaType: string) => {
  const id = uuidv4()

  // Create an empty image record with no base64 content
  const record = await xata.db.DealImage.create(
    id,
    { image: { enablePublicUrl: true, mediaType, base64Content: '' } },
    // Request an uploadUrl from the created record. We can use it to upload a file to replace the empty one
    ['image.url', 'image.uploadUrl', 'image.enablePublicUrl']
  )
  console.log(record)

  return {
    id: record.id,
    uploadUrl: record.image?.uploadUrl,
    url: record.image?.url,
  }
}

export const deleteImage = async (id: string) => {
  await xata.db.DealImage.delete(id)
}
