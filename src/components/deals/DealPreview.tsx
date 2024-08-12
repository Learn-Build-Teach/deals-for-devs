import { format } from 'date-fns'
import { Category } from '@/types/Types'
import DealImage from './DealImage'
import ClickableCoupon from '../ClickableCouponCode'
import TagsList from '../forms/add-a-deal/TagsList'
import { FaLink } from 'react-icons/fa'

export default function DealPreview({
  link,
  coupon,
  startDate,
  endDate,
  category,
  name,
  description,
  coverImageURL,
  tags,
}: {
  link: string
  coupon?: string | null
  tags: string[]
  couponPercent?: number | null
  startDate: Date
  endDate?: Date
  category: string
  name: string
  description: string
  coverImageURL?: string | null
}) {
  return (
    <div className=" mx-auto max-w-[800px] text-white">
      <div className="mb-10">
        <p className="mb-2 font-bold  text-teal-500">{category || ''}</p>
        <div className="mb-10">
          <h1 className="inline text-2xl transition-colors hover:text-teal-500 md:text-3xl">
            <a href={link}>
              {name} <FaLink className="inline h-4 md:h-6" />
            </a>
          </h1>
        </div>

        <div className="text-md mb-4 font-light md:text-lg">
          <div className="mb-1 flex flex-wrap gap-2">
            <span className="w-40 text-white/70 ">Valid from:</span>
            <span className="font-bold">
              {`${format(new Date(startDate), 'MMM d, yyyy')} - ${endDate ? format(new Date(endDate), 'MMM d, yyyy') : '(no end date)'}` ||
                'No coupon code required'}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2 text-lg font-light md:mt-1.5">
            <span className="w-40 text-white/70">Coupon Code:</span>
            <span className="font-bold">
              {coupon ?
                <ClickableCoupon coupon={coupon} />
              : 'No coupon code required'}
            </span>
          </div>
          <TagsList tags={tags} />
        </div>
      </div>
      <div className="relative mx-auto aspect-video w-full  ">
        <DealImage
          name={name}
          coverImageURL={coverImageURL || null}
          category={category as Category}
        />
      </div>

      <div className="text-md mt-5 flex w-full flex-col items-start md:mt-10 md:text-lg ">
        <span className="font-bold uppercase">Description</span>
        <p className="whitespace-pre-wrap font-light">{description}</p>
      </div>
    </div>
  )
}
