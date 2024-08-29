import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'

export const revalidate = 120

export default async function Disclaimer() {
  return (
    <Container>
      <main>
        <PageHeader heading="Disclaimer" />
        <div className="pb-10">
          <p className=" text-lrg text-gray-300">
            Some deals may include affiliate links. Proceeds from these
            affiliate links are invested back into the developer community
            through giveaways on courses and other resources.
          </p>
        </div>
      </main>
    </Container>
  )
}
