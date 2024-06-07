import DevGiveaways from '@/components/DevGiveaways'
import FeaturedDeals from '@/components/FeaturedDeals'
import Hero from '@/components/Hero'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'
import { getApprovedFeaturedDeals } from '@/lib/queries'

export default async function Home() {
  const deals = await getApprovedFeaturedDeals()
  return (
    <main>
      <Hero />

      <FeaturedDeals deals={deals} />
      <Separator className="mb-20" />
      <NeverMissADeal />
      <Separator className="mb-20" />
      <DevGiveaways />
    </main>
  )
}
