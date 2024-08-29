import DealsList from './DealsList'
import { getApprovedFeaturedDeals } from '@/lib/queries'

interface FeaturedDealsProps {
  limit?: number
}
export default async function FeaturedDeals({ limit }: FeaturedDealsProps) {
  const deals = await getApprovedFeaturedDeals(limit)
  return <DealsList deals={deals} />
}
