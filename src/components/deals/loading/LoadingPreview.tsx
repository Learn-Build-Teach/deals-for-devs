import Section from '@/components/Section'
import LoadingDealImage from './LoadingDealImage'
import LoadingTagsList from './LoadingTagsList'
import LoadingText, { LOADING_TEXT_WIDTHS } from './LoadingText'

export default function LoadingPreview() {
  return (
    <Section className="opacity-65">
      <div className="text-gray-700 ">
        <div className="mb-10">
          <LoadingText className="mb-2 font-bold" />
          <div className="mb-10 flex flex-row items-end justify-between gap-x-4">
            <LoadingText
              className="text-2xl md:text-3xl"
              width={LOADING_TEXT_WIDTHS.LARGE}
            />
            <LoadingText
              className="rounded-md px-2 py-1"
              width={LOADING_TEXT_WIDTHS.SMALL}
            ></LoadingText>
          </div>

          <LoadingText
            width={LOADING_TEXT_WIDTHS.MEDIUM}
            className="text-md mb-1 font-bold md:text-lg"
          />
          <LoadingText
            width={LOADING_TEXT_WIDTHS.SMALL}
            className="text-md mb-4 font-bold md:text-lg"
          />
          <LoadingTagsList />
        </div>

        <div className="relative mx-auto aspect-video w-full">
          <LoadingDealImage />
        </div>

        <div className="text-md mb-10 mt-5 flex w-full flex-col items-start gap-y-1 md:mt-10 md:text-lg">
          <LoadingText className="font-bold"></LoadingText>

          <LoadingText className="h-40 w-full" />
        </div>
      </div>
    </Section>
  )
}
