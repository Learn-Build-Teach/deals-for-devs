import Section from '@/components/Section'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <Section>
      <main className="flex justify-center">
        <SignUp />
      </main>
    </Section>
  )
}
