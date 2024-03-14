import Hero from '@/components/Hero'
import NeverMissADeal from '@/components/NeverMissADeal'
import DevGiveaways from '@/components/DevGiveaways'
import Separator from '@/components/Separator'

export default function Home() {
  return (
    <main>
      <Hero />
      <Separator className="mb-24" />
      <NeverMissADeal />
      <Separator className="mb-12" />
      <DevGiveaways />
    </main>
  )
}
