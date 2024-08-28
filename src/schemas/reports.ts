import { z } from 'zod'

export const reportSchema = z.object({
  dealId: z.string(),
  reason: z.string(),
  email: z.string().email(),
})
