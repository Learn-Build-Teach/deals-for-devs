import { getDeals } from '@/queries/deals'
import DealsList from './DealsList'

interface FeaturedDealsProps {
  limit?: number
}
export default async function FeaturedDeals({ limit }: FeaturedDealsProps) {
  const deals = await getDeals({ limit, featured: true })
  return <DealsList deals={deals} />
}
