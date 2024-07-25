import DealsList from './DealsList'
import { getApprovedFeaturedDeals } from '@/lib/queries'

export default async function FeaturedDeals() {
  const deals = await getApprovedFeaturedDeals()
  return <DealsList deals={deals} />
}
