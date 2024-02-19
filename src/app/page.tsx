import Hero from '@/components/Hero'
import Link from 'next/link'
import FeaturedDeals from '@/components/deals/FeaturedDeals'
import { Category } from '@/types/Types'
import SubscribeForm from '@/components/forms/SubscribeForm'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="my-20 text-center">
        <Link
          href="/deals"
          className="rounded-lg border-4 border-teal-800 bg-teal-600 p-4 px-10 text-xl text-teal-100 transition-colors duration-300 ease-in-out hover:bg-teal-700 "
        >
          View All Deals
        </Link>
      </div>

      {/* deals */}
      <div className="mb-20 flex flex-col gap-y-16 px-6 md:px-0">
        {[
          Category.COURSE,
          Category.TOOL,
          Category.CONFERENCE,
          Category.EBOOK,
        ].map((category) => (
          <FeaturedDeals category={category} key={category} />
        ))}
      </div>

      {/* Never Miss A Deal */}
      <div className="mb-11 flex flex-col items-center rounded-2xl bg-[#0C111C] pt-[60px] md:pt-[97px]">
        <span className="w-[341px] text-center text-2xl text-white md:w-[635px] md:text-5xl">
          Never miss a <span className="text-teal-500">deal</span> for your
          favorite tools or courses
        </span>
        <span className="mb-[70px] mt-4 text-center text-sm font-light leading-[21.13px] text-white/70 md:mb-[90px] md:mt-[22px] md:text-lg">
          We'll send upcoming and ongoing deals straight to your inbox every
          month
        </span>
        <div className="mb-12 bg-gray-900 md:mb-0">
          <SubscribeForm />
        </div>
        <Image
          src="/nmad-logos.png"
          width={609}
          height={65.1}
          className="mb-3 mt-8 hidden md:block"
          alt="Never Miss A Deal Logos"
        />
      </div>
    </main>
  )
}
