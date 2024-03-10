import Link from 'next/link'
import Icon from './Icon'
import Image from 'next/image'

type TechStack = {
  Url: string
  id: string
  size: number
  className?: string
}

const techStack: TechStack[] = [
  {
    Url: 'https://nextjs.org/',
    id: 'nextjs',
    size: 173.58,
    className: 'w-20 h-3.5 md:w-44 md:h-7',
  },
  {
    Url: 'https://xata.io/',
    id: 'xata',
    size: 142,
    className: 'w-20 h-9 md:w-36 md:h-10',
  },
  {
    Url: 'https://sentry.io/',
    id: 'sentry',
    size: 221,
    className: 'w-28 h-8 md:w-56 md:h-16',
  },
]

export default function Footer() {
  return (
    <div className="bg-[#0C111C] py-9">
      <div className="mx-auto flex max-w-56 flex-col items-center md:max-w-4xl">
        <span className="mb-8 text-sm font-medium leading-8 text-white md:text-3xl">
          Built With
        </span>

        {/* built with logos */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
          {techStack.map((sponsor, index) => (
            <a key={index} href={sponsor.Url} target="_blank">
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
              className="h-6 w-20 md:h-12 md:w-40"
              alt="clerk.dev logo"
            />
          </a>
        </div>

        {/* james quick social link */}
        <Link
          className="mt-8 text-sm font-medium text-teal-500 md:text-xl"
          href="https://jamesqquick.com/"
        >
          @jamesqquick
        </Link>
      </div>
    </div>
  )
}
