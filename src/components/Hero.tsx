import SubscribeForm from './forms/SubscribeForm'

export default function Hero() {
  return (
    <div className="mb-[40px] md:mb-[100px]">
      <div className="flex flex-col gap-[23px] md:flex-row md:gap-[126px]">
        <h1 className="max-w-[351px] text-[36px] font-semibold leading-[42.26px] tracking-tight text-white md:max-w-[861px] md:text-7xl md:leading-[84.53px]">
          The best <span className="text-teal-500">deals</span> and{' '}
          <span className="text-teal-500">giveaways</span> for developers
        </h1>

        {/* subscription form */}
        <div className="mb-10 max-w-[490px] md:mb-[90px]">
          <p className="mb-[11px] text-[14px] leading-[21px] text-white md:mb-[25px] md:text-lg md:leading-[30px]">
            Get upcoming and ongoing deals sent straight to your inbox every
            month!
          </p>
          <SubscribeForm />
        </div>
      </div>

      {/* separator */}
      <div className="border border-white/[.31]" />
    </div>
  )
}
