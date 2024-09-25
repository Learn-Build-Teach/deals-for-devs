import Section from '@/components/Section'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <Section>
      <main className="flex justify-center">
        <SignIn />
      </main>
    </Section>
  )
}
