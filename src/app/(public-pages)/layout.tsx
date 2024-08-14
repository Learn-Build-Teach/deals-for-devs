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
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-5 md:px-24 xl:pt-20">
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
