'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { useEffect, useRef } from 'react'
import Overlay from '../Overlay'
import { useSearch } from '@/components/search/SearchContext'
import { FaSearch, FaTimes } from 'react-icons/fa'
import SearchResults from '@/components/search/SearchResults'
import Footer from '@/components/search/Footer'
import { Button } from '../ui/button'

export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, data, isLoading, error, setQuery, query } =
    useSearch()
  const inputRef = useRef<null | HTMLInputElement>(null)

  const openSearch = () => {
    setSearchOpen(true)
    inputRef?.current?.focus()
  }

  const onClose = () => {
    setSearchOpen(false)
    setQuery('')
  }

  useHotkeys('/', openSearch, {
    preventDefault: true,
  })

  const handleSearchOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setQuery('')
  }

  return (
    <Overlay isOpen={searchOpen} onClose={onClose} className="h-[90vh]">
      <div className="flex h-full flex-col">
        <div className="relative">
          <input
            type="text"
            value={query}
            className="mb-8 w-full rounded-md border-2 border-gray-400  bg-transparent p-4 px-10 text-lg text-gray-100"
            onChange={handleSearchOnChange}
            ref={inputRef}
          />
          <FaSearch className="absolute left-4 top-6 text-gray-400" />
          <Button
            className="absolute right-4 top-4"
            variant="ghost-light"
            onClick={handleClearSearch}
            aria-label="Clear search query"
          >
            <FaTimes className="" />
          </Button>
        </div>

        <SearchResults loading={isLoading} deals={data} searchQuery={query} />
        <Footer />
      </div>
    </Overlay>
  )
}
