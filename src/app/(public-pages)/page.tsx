import Container from '@/components/Container'
import FeaturedDealsSection from '@/components/deals/FeaturedDealsSection'
import DevGiveaways from '@/components/DevGiveaways'
import Hero from '@/components/Hero'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'

export const revalidate = 120

export default async function Home() {
  return (
    <Container>
      <main className="mx-auto max-w-7xl">
        <Hero />
        <FeaturedDealsSection />
        <Separator className="mx-6 mb-20 md:mx-0" />
        <div className="mb-20">
          <NeverMissADeal />
        </div>
        <Separator className="mx-6 mb-20 md:mx-0" />
        <DevGiveaways />
      </main>
    </Container>
  )
}
