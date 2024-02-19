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
} from '@react-email/components'

interface EmailTemplateProps {
  email: string
  link: string
}

const baseUrl =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:3000'
  : 'https://dealsfordevs.com'

export const confirmEmail = (props: EmailTemplateProps) => (
  <Html lang="en">
    <Head />
    <Preview>Confirm your email address</Preview>
    <Tailwind>
      <Head />
      <Body className="mx-auto bg-white p-4">
        <Container>
          <Section>
            <Img
              src={`${baseUrl}/logo-teal.png`}
              width="60"
              alt="Deals for Devs"
            />
          </Section>
          <Heading style={h1}>Confirm your email address</Heading>
          <Text className="mb-[15px] text-xl">
            Your confirmation link is below. Please click it to confirm your
            email:
          </Text>

          <Section style={codeBox}>
            <Text className="sm:text-xl md:text-2xl">{props.link}</Text>
          </Section>

          <Text className="text-xl">
            If you {`didn't`} request this email, {`there's`} nothing to worry
            about, you can safely ignore it.
          </Text>
          <Text className="font-sans text-3xl">
            <strong>{`Deals for Devs Team`}</strong>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

const h1 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: '700',
  margin: '10px 0',
  padding: '0',
  lineHeight: '42px',
}

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '10px',
  marginBottom: '15px',
  padding: '10px',
}
