import Footer from '@/components/Footer'
import GlobalSearch from '@/components/search/GlobalSearch'
import { SearchProvider } from '@/components/search/SearchContext'

import Nav from '@/components/nav/Nav'
import Container from '@/components/Container'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <SearchProvider>
        <Container>
          <Nav />
        </Container>

        <div className="grow">{children}</div>
        <Footer />
      </SearchProvider>
    </div>
  )
}
