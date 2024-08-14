import { inngest } from './client'
import { sendInngestTestEmail } from '@/utils/resend/email-sendHelloFromIngest'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s')
    return { event, body: 'Hello, World!' }
  }
)

export const sendConfirmationEmail = inngest.createFunction(
  { id: 'send-email' },
  { event: 'test/send-email' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s')
    const { email } = event.data
    const { error } = await sendInngestTestEmail(email)
    if (error) {
      return { event, body: { error: 'Failed to send confirmation email' } }
    }
    return { event, body: { data: email } }
  }
)
