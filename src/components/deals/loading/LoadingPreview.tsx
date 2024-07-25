import LoadingDealImage from './LoadingDealImage'

export default function LoadingPreview() {
  return (
    <div className="flex flex-col items-start gap-10 text-white xl:flex-row xl:items-center">
      <div className="align-center relative aspect-video w-full max-w-[600px] self-center">
        <LoadingDealImage />
      </div>
    </div>
  )
}
