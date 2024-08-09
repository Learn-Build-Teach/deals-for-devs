'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { useEffect, useRef, useState } from 'react'
import Overlay from '../Overlay'
import { useSearch } from '@/components/search/SearchContext'
import { FaSearch, FaTimes } from 'react-icons/fa'
import SearchResults from '@/components/search/SearchResults'
import { Deal } from '@prisma/client'
import Footer from '@/components/search/Footer'

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const { searchOpen, setSearchOpen } = useSearch()
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null)
  const [deals, setDeals] = useState<Deal[] | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [searchOpen])

  const openSearch = () => {
    setSearchOpen(true)
    document.body.style.overflow = 'hidden'
    inputRef?.current?.focus()
  }

  const reset = () => {
    setSearchOpen(false)
    setSearchQuery('')
    setDeals(null)
    document.body.style.overflow = 'unset'
  }

  useHotkeys('esc', reset)

  useHotkeys('/', openSearch, {
    preventDefault: true,
  })

  const handleSearchOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value)
    if (!e.target.value) {
      setDeals(null)
      return
    }
    if (timer) {
      clearTimeout(timer)
    }
    setLoading(true)
    setTimer(
      setTimeout(async () => {
        try {
          const res = await fetch(`/api/deals?query=${e.target.value}`)
          if (res.ok) {
            const data = await res.json()
            setDeals(data)
          }
          setLoading(false)
        } catch (error) {}
      }, 500)
    )
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setDeals(null)
  }

  return (
    <div>
      <Overlay isOpen={searchOpen} onClose={reset}>
        <div className="flex h-full flex-col">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              className="mb-8 w-full rounded-md border-2 border-gray-400  bg-transparent p-4 px-10 text-lg text-gray-100"
              onChange={handleSearchOnChange}
              ref={inputRef}
            />
            <FaSearch className="absolute left-4 top-6 text-gray-400" />
            <button
              className="absolute right-4 top-6"
              onClick={handleClearSearch}
              aria-label="Clear search query"
            >
              <FaTimes className="text-gray-400 hover:text-gray-100" />
            </button>
          </div>

          <SearchResults
            loading={loading}
            deals={deals}
            searchQuery={searchQuery}
          />
          <Footer />
        </div>
      </Overlay>
    </div>
  )
}
