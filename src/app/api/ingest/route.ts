import { serve } from 'inngest/next'
import { inngest } from '@/ingest/client'
import { helloWorld, sendConfirmationEmail } from '@/ingest/functions'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, sendConfirmationEmail],
})
