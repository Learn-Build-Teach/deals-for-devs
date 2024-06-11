import React from 'react'
import SubscribeForm from './forms/SubscribeForm'

export default function NeverMissADeal() {
  return (
    <div className="mb-16 flex flex-col items-center rounded-2xl bg-[#0C111C] px-4 py-14 md:mb-36 md:mt-40 md:py-24">
      <span className="w-[341px] text-center text-2xl text-white md:w-[635px] md:text-5xl">
        Never miss a <span className="text-teal-500">deal</span> for your
        favorite tools or courses
      </span>
      <span className="mb-[70px] mt-4 text-center text-sm font-light leading-[21.13px] text-white/70 md:mb-[90px] md:mt-[22px] md:text-lg">
        {`We'll`} send upcoming and ongoing deals straight to your inbox every
        month
      </span>
      <div className="mb-12 bg-gray-900 md:mb-0">
        <SubscribeForm />
      </div>
    </div>
  )
}
