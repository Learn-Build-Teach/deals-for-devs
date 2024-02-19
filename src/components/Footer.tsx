import Link from 'next/link'
import Icon from './Icon'
import Image from 'next/image'

type Sponsor = {
  Url: string
  id: string
  size: number
  className?: string
}

const techStack: Sponsor[] = [
  {
    Url: 'https://nextjs.org/',
    id: 'nextjs',
    size: 173.58,
    className: 'w-[88.54px] h-[14.83px] md:w-[173.58px] md:h-[29.08px]',
  },
  {
    Url: 'https://xata.io/',
    id: 'xata',
    size: 142,
    className: 'w-[88px] h-[37px] md:w-[142px] md:h-[40px]',
  },
  {
    Url: 'https://xata.io/',
    id: 'sentry',
    size: 221,
    className: 'w-[113px] h-[34px] md:w-[221px] md:h-[66px]',
  },
]

export default function Footer() {
  return (
    <div className="bg-[#0C111C] px-[80px] py-9 md:px-0 md:py-[36px]">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <span className="mb-8 text-sm font-medium leading-8 text-white md:text-3xl">
          Built With
        </span>
        <div className="flex flex-wrap items-center gap-4 md:gap-10">
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
          <Image
            src="/icons/clerk.svg"
            width={159}
            height={49}
            className="h-[25px] w-[81px] md:h-[49px] md:w-[159px]"
            alt="clerk.dev logo"
          />
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
