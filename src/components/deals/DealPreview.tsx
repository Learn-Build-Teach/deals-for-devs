import { format } from 'date-fns'
import { Category } from '@/types/Types'
import DealImage from './DealImage'
import ClickableCoupon from '../ClickableCouponCode'
import TagsList from '../forms/add-a-deal/TagsList'

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
  tags?: string[]
  couponPercent?: number | null
  startDate: Date
  endDate?: Date
  category: string
  name: string
  description: string
  coverImageURL?: string | null
}) {
  return (
    <div className="flex flex-col items-start gap-10 text-white xl:flex-row xl:items-center">
      <div className="align-center relative aspect-video w-full max-w-[600px] self-center">
        <DealImage
          name={name}
          coverImageURL={coverImageURL || null}
          category={category as Category}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl md:text-3xl">{name}</h1>
        <TagsList tags={tags} />
        <div className="mt-2 flex flex-wrap gap-2 text-sm md:mt-4 md:text-lg">
          <span className="font-light text-white/70">Website:</span>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="font-normal underline hover:text-teal-500"
          >
            {link}
          </a>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className="text-white/70">Coupon Code:</span>
          <span className="">
            {coupon ?
              <ClickableCoupon coupon={coupon} />
            : 'No coupon code required'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className=" text-white/70 ">Valid from:</span>
          <span className="font-normal">
            {`${format(new Date(startDate), 'MMM d')} - ${endDate ? format(new Date(endDate), 'MMM d, yyyy') : '(no end date)'}` ||
              'No coupon code required'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className=" text-white/70">Category:</span>
          <span className="font-normal">{category || ''}</span>
        </div>
        <div className="mt-5 flex w-full flex-col items-start text-sm md:mt-10 md:text-lg ">
          <span className="font-bold uppercase">DESCRIPTION</span>
          <p className="whitespace-pre-wrap font-light">{description}</p>
        </div>
      </div>
    </div>
  )
}
