import { NextRequest, NextResponse } from 'next/server'
import { subDays } from 'date-fns'

import { getXataClient } from '@/xata'
import {
  getRecentApprovedDealsByDate,
  getRecentDealsByDate,
} from '@/lib/queries'
const client = getXataClient()

// Force dynamic routing
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // make sure the request is coming from Vercel
  const authToken = (req.headers.get('authorization') || '')
    .split('Bearer ')
    .at(1)

  if (!authToken || authToken != process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // get all approved deals within the last month
  const thirtyDaysAgo = subDays(new Date(), 30)
  const deals = await getRecentApprovedDealsByDate(thirtyDaysAgo)

  // categorize the deals
  const courses = deals.filter((deal) => deal.category === 'Course')
  const conferences = deals.filter((deal) => deal.category === 'Conference')
  const ebooks = deals.filter((deal) => deal.category === 'Ebook')
  const tools = deals.filter((deal) => deal.category === 'Tool')
  const misc = deals.filter((deal) => deal.category === 'Misc')
  const officeEquipment = deals.filter(
    (deal) => deal.category === 'Office Equipment'
  )

  return NextResponse.json({
    courses: courses,
    conferences: conferences,
    ebooks: ebooks,
    tools: tools,
    misc: misc,
    officeEquipment: officeEquipment,
  })
}
