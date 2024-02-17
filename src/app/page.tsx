import Hero from '@/components/Hero'
import Link from 'next/link'
import FeaturedDeals from '@/components/FeaturedDeals'
import { Category } from '@/types/Types'
import SubscribeForm from '@/components/forms/SubscribeForm'

export default function Home() {
	return (
		<main>
			<Hero />

			<div className='text-center my-20'>
				<Link
					href='/deals'
					className='text-xl border-4 border-teal-800 bg-teal-600 text-teal-100 px-10 p-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out '
				>
					View All Deals
				</Link>
			</div>

			<div className='flex gap-y-16 flex-col mb-20'>
				{[
					Category.COURSE,
					Category.TOOL,
					Category.CONFERENCE,
					Category.EBOOK,
				].map((category) => (
					<FeaturedDeals category={category} key={category} />
				))}
			</div>
		</main>
	)
}
