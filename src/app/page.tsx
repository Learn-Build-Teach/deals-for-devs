import Hero from '@/components/Hero';
import Timer from '@/components/Timer';
import Link from 'next/link';
import FeaturedDeals from '@/components/FeaturedDeals';
import { Category } from '@/types/Category';

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className="mb-20">
        <Timer />
      </div>
      <div className="text-center my-20">
        <Link
          href="/deals"
          className="text-xl border-4 border-teal-800 bg-teal-600 text-teal-100 px-10 p-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out "
        >
          View All Deals
        </Link>
      </div>
      <div className="flex gap-y-16 flex-col mb-20">
        {[
          Category.Video,
          Category.Tool,
          Category.Conference,
          Category.Ebook,
        ].map((category) => (
          <FeaturedDeals category={category} key={category} />
        ))}
      </div>
    </main>
  );
}
