import LoadingDealImage from './LoadingDealImage'

export default function LoadingDealsList({ count }: { count: number }) {
  const arr = Array.from(Array(count).keys())

  return (
    <div className="mx-auto py-10">
      <div className="mx-auto grid grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2  lg:gap-x-12 xl:grid-cols-3">
        <>
          {arr.map((num) => (
            <div key={num} className="w-full">
              <LoadingDealImage />
              <div className="mt-1 h-[1.75rem]"></div>
            </div>
          ))}
        </>
      </div>
    </div>
  )
}
