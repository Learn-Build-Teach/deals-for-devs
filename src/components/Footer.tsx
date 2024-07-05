import Link from 'next/link'
import Icon from './Icon'
import Image from 'next/image'

type TechStack = {
  Url: string
  id: string
  size: number
  className?: string
  alt: string
}

const techStack: TechStack[] = [
  {
    Url: 'https://nextjs.org/',
    id: 'nextjs',
    size: 173.58,
    alt: 'Next.js',
    className: 'w-20 h-3.5',
  },
  {
    Url: 'https://xata.io/',
    id: 'xata',
    size: 142,
    alt: 'Xata',
    className: 'w-20 h-9',
  },
  {
    Url: 'https://sentry.io/',
    id: 'sentry',
    size: 221,
    alt: 'Sentry',
    className: 'w-28 h-8',
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0C111C] py-16">
      <div className="mx-auto flex max-w-56 flex-col items-center md:max-w-4xl">
        <span className="mb-2 text-sm font-medium leading-8 text-white md:text-3xl">
          Built With
        </span>

        {/* built with logos */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {techStack.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.Url}
              target="_blank"
              aria-label={sponsor.alt}
            >
              <Icon
                id={sponsor.id}
                size={sponsor.size}
                className={sponsor.className}
              />
            </a>
          ))}

          {/* clerk was too difficult to make into a sprite */}
          <a href="https://clerk.com/" target="_blank">
            <Image
              src="/icons/clerk.svg"
              width={159}
              height={49}
              className="h-6 w-20"
              alt="clerk.dev"
            />
          </a>
        </div>

        {/* james quick social link */}
        {/* <Link
          className="mt-8 text-sm font-medium text-teal-500 md:text-xl"
          href="https://jamesqquick.com/"
        >
          @jamesqquick
        </Link> */}
      </div>
    </footer>
  )
}
