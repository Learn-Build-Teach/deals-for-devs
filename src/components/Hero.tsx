import SubscribeForm from './forms/SubscribeForm'

export default function Hero() {
  return (
    <div className="">
      <div className="flexjustify-center xl:justify-normal ">
        <div className="flex flex-col gap-6 md:gap-12 md:pb-20 lg:flex-row lg:items-center lg:gap-8">
          <h1 className="max-w-xl text-4xl font-semibold leading-10 tracking-tight text-white md:max-w-xl md:text-6xl md:leading-14 lg:max-w-xl lg:text-7xl lg:leading-16 2xl:max-w-2xl">
            The best <span className="text-teal-500">deals</span> and{' '}
            <span className="text-teal-500">giveaways</span> for developers
          </h1>

          {/* subscription form */}
          <div className="w-full max-w-xl xl:self-center">
            <p className="mb-3 max-w-80 text-sm leading-5 text-white md:mb-6 md:max-w-lg md:text-xl md:leading-8 lg:text-2xl">
              Get upcoming and ongoing deals sent straight to your inbox every
              month!
            </p>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  )
}
