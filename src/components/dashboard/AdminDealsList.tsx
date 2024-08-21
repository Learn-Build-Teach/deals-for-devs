import { Deal } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import Separator from '../Separator'
import DealImage from '../deals/DealImage'
import { Category } from '@/types/Types'
import { cn } from '@/lib/utils'

export default function AdminDealsList({ deals }: { deals: Deal[] }) {
  return (
    <div className="flex flex-col items-stretch">
      {deals.map((deal) => (
        <div key={deal.xata_id}>
          <Link
            className="text-xl font-bold hover:text-teal-500"
            href={`/dashboard/deals/${deal.xata_id}`}
          >
            <div className="flex flex-row items-center gap-x-4">
              <div
                className={cn(
                  'hidden h-4 w-4 rounded-full lg:block',
                  deal.approved ? 'bg-green-500' : 'bg-yellow-500'
                )}
              ></div>
              <div className="hidden w-32 lg:block">
                <DealImage
                  coverImageURL={deal.coverImageURL}
                  category={deal.category as Category}
                  name={deal.name}
                />
              </div>
              <span className="mr-4 hidden w-32 text-lg text-slate-400 lg:inline">
                {format(new Date(deal.xata_createdat), 'MMM d')}
              </span>
              {deal.name}
            </div>
          </Link>
          <div className="my-4 ">
            <Separator />
          </div>
        </div>
      ))}
    </div>
  )
}
