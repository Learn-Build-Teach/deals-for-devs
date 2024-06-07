import SubscribeForm from './forms/SubscribeForm'

export default function Hero() {
  return (
    <div className="px-6 md:px-0">
      <div className="flex justify-center pl-2 md:pl-12 lg:pl-14">
        <div className="flex flex-col gap-6 md:gap-12 md:pb-20 lg:gap-16 xl:flex-row">
          <h1 className="max-w-80 text-4xl font-semibold leading-10 tracking-tight text-white md:max-w-xl md:text-6xl md:leading-14 lg:max-w-2xl lg:text-7xl lg:leading-16 xl:max-w-xl 2xl:max-w-2xl">
            The best <span className="text-teal-500">deals</span> and{' '}
            <span className="text-teal-500">giveaways</span> for developers
          </h1>

          {/* subscription form */}
          <div className="xl:self-center">
            <p className="mb-3 max-w-80 text-sm leading-5 text-white md:mb-6 md:max-w-lg md:text-xl md:leading-8 lg:max-w-xl lg:text-2xl">
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
