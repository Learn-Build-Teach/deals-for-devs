import SubscribeForm from './forms/SubscribeForm'

export default function Hero() {
  return (
    <div className="px-6 md:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:gap-24 ">
        <h1 className="max-w-[351px] text-xl font-semibold leading-10 tracking-tight text-white md:max-w-[861px] md:text-7xl md:leading-[84px]">
          The best <span className="text-teal-500">deals</span> and{' '}
          <span className="text-teal-500">giveaways</span> for developers
        </h1>

        {/* subscription form */}
        <div>
          <p className="mb-3 text-xs leading-5 text-white md:mb-6 md:text-2xl md:leading-8">
            Get upcoming and ongoing deals sent straight to your inbox every
            month!
          </p>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}
