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
interface EmailTemplateProps {
  email: string
  link: string
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const confirmEmail = (props: EmailTemplateProps) => (
  <Tailwind>
    <Html lang="en">
      <Head />
      <Preview>Confirm your email address</Preview>
      <Body className="mx-auto bg-white p-4">
        <Container>
          <Section>
            <Img
              src={`${baseURL}/logo-teal.png`}
              width="60"
              alt="Deals for Devs"
            />
          </Section>
          <Heading style={h1}>Confirm your email address</Heading>
          <Section className="py-6">
            <Link
              href={props.link}
              className="rounded-lg border bg-teal-500 px-5 py-3 text-xl text-white no-underline"
            >
              {' '}
              Confirm Email
            </Link>
          </Section>
          <Text className="mb-[15px] text-xl">
            Your confirmation link is below. Please click it to confirm your
            email:
          </Text>

          <Section style={codeBox}>
            <Text className="text-xl">{props.link}</Text>
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

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '10px',
  marginBottom: '15px',
  padding: '10px',
}
