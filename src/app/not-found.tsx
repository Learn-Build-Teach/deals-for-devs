import Container from '@/components/Container'
import DevGiveaways from '@/components/DevGiveaways'
import Footer from '@/components/Footer'
import Nav from '@/components/nav/Nav'
import NeverMissADeal from '@/components/NeverMissADeal'
import PageHeader from '@/components/PageHeader'
import { SearchProvider } from '@/components/search/SearchContext'
import Separator from '@/components/Separator'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <SearchProvider>
        <Container className="pb-10">
          <Nav />
          <main>
            <PageHeader heading="Sorry, this page isn't available" />
            <div className='flex flex-wrap text-white text-sm font-light  md:text-lg'>
              <p className="mr-2">The link you followed may be broken, or the page may have been removed. </p>
              <Link className=" underline font-semibold"
                href="/">
                Back to Home
              </Link>
            </div>

            {/* If you want to add these two sections (NeverMissADeal & DevGiveaways) */}
            {/*  
            <div className="mb-20">
              <NeverMissADeal />
            </div>
            <Separator className="mx-6 mb-20 md:mx-0" />
            <DevGiveaways /> */}

          </main>
        </Container>
        <Footer />
      </SearchProvider>
    </div>
  )
}
