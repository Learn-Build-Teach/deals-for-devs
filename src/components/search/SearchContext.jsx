'use client'
import React, { createContext, useContext, useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from '@uidotdev/usehooks'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

const SearchContext = createContext()

export function useSearch(id) {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedSearchTerm = useDebounce(query, 300)

  const { data, error, isLoading } = useSWR(
    debouncedSearchTerm ?
      `/api/deals/search?query=${debouncedSearchTerm}`
    : null,
    fetcher,
    {
      revalidateIfStale: false,
    }
  )

  return (
    <SearchContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        data,
        error,
        isLoading,
        setQuery,
        query,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
