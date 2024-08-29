import Icon from './Icon'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

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
      <div className="mx-auto flex max-w-56 flex-col items-center gap-y-10 md:max-w-4xl">
        <a
          href="https://github.com/Learn-Build-Teach/deals-for-devs"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lg mt-8 flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-gray-700 "
        >
          <FaGithub />
          <span>View on GitHub</span>
        </a>
        <div>
          <p className="mb-4 text-center text-sm font-light leading-8 text-white md:text-xl">
            Built With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
            {techStack.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.Url}
                target="_blank"
                aria-label={sponsor.alt}
                className="transition-transform hover:scale-105 "
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
                className="h-6 w-20 transition-transform hover:scale-105 "
                alt="clerk.dev"
              />
            </a>
          </div>
        </div>
        <span className="text-md flex items-center gap-x-1 font-medium text-white">
          <span className="">With ❤️ from the</span>
          <a
            className=" text-teal-500 hover:text-teal-400"
            href="https://learnbuildteach.com/"
          >
            Learn Build Teach
          </a>
          <span>community</span>
        </span>
      </div>
    </footer>
  )
}
