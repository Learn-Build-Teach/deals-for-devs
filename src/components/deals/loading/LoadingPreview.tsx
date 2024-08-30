import Section, { SECTION_STYLE, SECTION_WIDTH } from '@/components/Section'
import LoadingDealImage from './LoadingDealImage'
import LoadingTagsList from './LoadingTagsList'
import LoadingText, {
  LOADING_TEXT_STYLE,
  LOADING_TEXT_WIDHTS,
} from './LoadingText'

export default function LoadingPreview() {
  return (
    <div>
      <Section
        width={SECTION_WIDTH.SM}
        className="pb-32 text-gray-700 sm:pb-40 md:pb-80"
      >
        <div className="mb-10">
          <LoadingText className="mb-2  font-bold" />
          <div className="mb-10 flex flex-row items-end justify-between gap-x-4">
            <LoadingText
              className="text-2xl md:text-3xl"
              width={LOADING_TEXT_WIDHTS.LARGE}
            />
            <LoadingText
              className="px-2 py-1"
              width={LOADING_TEXT_WIDHTS.SMALL}
            ></LoadingText>
          </div>

          <LoadingText
            width={LOADING_TEXT_WIDHTS.MEDIUM}
            className="mb-4 font-bold"
          />
          <LoadingText
            width={LOADING_TEXT_WIDHTS.SMALL}
            className="mb-4 font-bold"
          />
          <LoadingTagsList />
        </div>
      </Section>

      <Section
        style={SECTION_STYLE.LIGHT}
        width={SECTION_WIDTH.SM}
        className="-mb-40 md:-mb-64"
      >
        <div className="-translate-y-48 md:-translate-y-80">
          <div className="relative mx-auto aspect-video w-full ">
            <LoadingDealImage />
          </div>

          <div className="text-md mb-10 mt-5 flex w-full flex-col items-start gap-y-1 md:mt-10 md:text-lg">
            <LoadingText
              style={LOADING_TEXT_STYLE.LIGHT}
              className="font-bold uppercase"
            ></LoadingText>

            <LoadingText
              style={LOADING_TEXT_STYLE.LIGHT}
              className="h-40 w-full whitespace-pre-wrap font-light"
            />
          </div>
        </div>
      </Section>
    </div>
  )
}
