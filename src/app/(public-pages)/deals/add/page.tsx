'use client'
import { useAddDealContext } from '@/context/AddDealContext'
import CreateDealForm from './DealForm'
import Loading from '@/components/Loading'
import DealPreview from './DealPreview'

export default function AddDeal() {
  const { dataLoaded } = useAddDealContext()

  return (
    <>
      {!dataLoaded && (
        <div className="mx-auto mt-16 flex justify-center  text-white">
          <Loading />
        </div>
      )}
      {dataLoaded && (
        <div className="mb-28 mt-10 flex  items-stretch gap-x-20 text-white ">
          <div className="grow md:min-w-[500px]">
            <CreateDealForm />
          </div>
          <div className="hidden w-0.5 bg-gray-100/20 xl:block"></div>
          <div className="hidden grow xl:block">
            <DealPreview />
          </div>
        </div>
      )}
    </>
  )
}
