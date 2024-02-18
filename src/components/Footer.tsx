import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className="bg-[#0C111C] py-[36px]">
      <div className="mx-auto flex max-w-4xl flex-col">
        <div className="flex flex-col items-center">
          <span className="mb-5 text-3xl font-medium leading-8 text-white">
            Built With
          </span>
          <Image
            src="/footer-sponsors.png"
            width={798}
            height={72}
            alt="Footer Sponsors"
            className="mb-[34px]"
          />
          <Link
            className="text-xl font-medium text-teal-500"
            href="https://jamesqquick.com/"
          >
            @jamesqquick
          </Link>
        </div>
      </div>
    </div>
  )
}
