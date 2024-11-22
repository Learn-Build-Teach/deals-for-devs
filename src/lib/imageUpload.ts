'use server'
import { getXataClient } from '@/xata'
const xata = getXataClient()

export const deleteImage = async (id: string) => {
  const res = await xata.db.DealImage.delete(id)
  return res?.toSerializable()
}

export const getImageUrl = async (id: string) => {
  const record = await xata.db.DealImage.read(id)
  return record?.toSerializable().image?.url
}
