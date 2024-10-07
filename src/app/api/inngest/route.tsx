import { serve } from 'inngest/next'
import { inngest } from '@/utils/inngest/client'

import { processNewDeal, sendEmailToAdmin } from '@/utils/inngest/functions'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processNewDeal, sendEmailToAdmin],
})
