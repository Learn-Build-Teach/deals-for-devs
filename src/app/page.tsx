import Hero from '@/components/Hero'
import Link from 'next/link'
import FeaturedDeals from '@/components/FeaturedDeals'
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
      <div className="mb-20 flex flex-col gap-y-16">
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
      <div className="mb-11 flex flex-col items-center rounded-2xl bg-[#0C111C] pt-[97px]">
        <span className="w-[635px] text-center text-5xl text-white">
          Never miss a <span className="text-teal-500">deal</span> for your
          favorite tools or courses
        </span>
        <span className="mb-[90px] mt-[22px] text-lg font-light leading-[21.13px] text-white/70">
          We'll send upcoming and ongoing deals straight to your inbox every
          month
        </span>
        <div className="bg-gray-900">
          <SubscribeForm />
        </div>
        <Image
          src="/nmad-logos.png"
          width={609}
          height={65.1}
          className="mb-3 mt-8"
          alt="Never Miss A Deal Logos"
        />
      </div>
    </main>
  )
}
