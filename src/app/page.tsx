import DevGiveaways from '@/components/DevGiveaways'
import Hero from '@/components/Hero'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'

export default async function Home() {
  return (
    <main>
      <Hero />
      <Separator className="mb-20" />
      <NeverMissADeal />
      <Separator className="mb-20" />
      <DevGiveaways />
    </main>
  )
}
