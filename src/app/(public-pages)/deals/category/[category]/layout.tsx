import CategoryOptions from '@/components/CategoryOptions'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Category } from '@/types/Types'

export default async function CategoryLayout({
  children,
  params,
}: {
  params: { category: string }
  children: React.ReactNode
}) {
  const category = decodeURIComponent(params.category).toUpperCase()

  return (
    <Container className="pb-20">
      <PageHeader heading="Deals" />
      <div className="pb-10">
        <CategoryOptions
          selectedCategory={
            category !== 'all' ? (category as Category) : undefined
          }
        />
      </div>
      <main>{children}</main>
    </Container>
  )
}
