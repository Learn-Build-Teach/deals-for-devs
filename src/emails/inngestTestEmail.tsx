import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
} from '@react-email/components'
import { env } from '@/env'
interface EmailTemplateProps {
  email: string
}

const baseURL = env.NEXT_PUBLIC_BASE_URL

export const inngestTestEmail = (props: EmailTemplateProps) => (
  <Tailwind>
    <Html lang="en">
      <Head />
      <Preview>This Email was sent using Inngest an Inngest Function</Preview>
      <Body className="mx-auto bg-white p-4">
        <Container>
          <Section>
            <Img
              src={`${baseURL}/logo-teal.png`}
              width="60"
              alt="Deals for Devs"
            />
          </Section>
          <Heading style={h1}>Hello from D4D & Inngest</Heading>
          <Text className="text-lg">
            If you are seeing this email then it worked! 🚀🎉
          </Text>
          <Text className="font-sans text-xl">
            <strong>Deals for Devs Team</strong>
          </Text>
          <Text className="text-sm">
            Ps. If you {`didn't`} request this email, {`there's`} nothing to
            worry about, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

const h1 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: '700',
  margin: '10px 0',
  padding: '0',
  lineHeight: '42px',
}
