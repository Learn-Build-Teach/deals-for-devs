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
  dealId: string
  appDomain: string
}

export const emailAdminNewDeal = (props: EmailTemplateProps) => (
  <Tailwind>
    <Html lang="en">
      <Head />
      <Preview>New Deal Submitted</Preview>
      <Body className="mx-auto bg-white p-4">
        <Container>
          <Section>
            <Img
              src={`${props.appDomain}/logo-teal.png`}
              width="60"
              alt="Deals for Devs"
            />
          </Section>
          <Heading style={h1}>Admin - Review new deal</Heading>
          <Section className="py-6">
            <Link
              href={`${props.appDomain}/dashboard/deals${props.dealId}`}
              className="rounded-lg border bg-teal-500 px-5 py-3 text-xl text-white no-underline"
            >
              Review Deal
            </Link>
          </Section>
          <Text className="text-lg">
            If you are having trouble clicking the button, copy and paste the
            URL below 👇
          </Text>
          <Section style={codeBox}>
            <Text className="text-lg">
              {`${props.appDomain}/dashboard/deals/${props.dealId}`}
            </Text>
          </Section>
          <Text className="text-sm">
            Ps. You received this email because you are an admin user for Deals
            For Devs.
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

emailAdminNewDeal.PreviewProps = {
  dealId: 'the-deal-id-here',
  appDomain: 'http://localhost:3000',
} as EmailTemplateProps

export default emailAdminNewDeal

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
