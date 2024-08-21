import Footer from '@/components/Footer'
import GlobalSearch from '@/components/search/GlobalSearch'
import { SearchProvider } from '@/components/search/SearchContext'

import Nav from '@/components/nav/Nav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-900">
      <div className="max-w-8xl mx-auto w-full px-4 pt-5 md:px-16 xl:pt-20">
        <SearchProvider>
          <GlobalSearch />
          <Nav />
        </SearchProvider>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
