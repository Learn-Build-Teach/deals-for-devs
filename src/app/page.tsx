import FeaturedDealsSection from '@/components/deals/FeaturedDealsSection'
import DevGiveaways from '@/components/DevGiveaways'
import Hero from '@/components/Hero'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'

export const revalidate = 120

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeaturedDealsSection />
      <Separator className="mb-20" />
      <div className="mb-20">
        <NeverMissADeal />
      </div>
      <Separator className="mb-20" />
      <DevGiveaways />
    </main>
  )
}
