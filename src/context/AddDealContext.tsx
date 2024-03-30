'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

const newDealSchema = z.object({
  productName: z.string(),
  category: z.string(),
  url: z.string(),
  summary: z.string(),
  coverImage: z.string().optional(),
  dateRange: z.string(),
  couponCode: z.string().optional(),
  percentage: z.number(),
  contactName: z.string(),
  contactEmail: z.string(),
})

type NewDealType = {
  productName: string
  category: string
  url: string
  summary: string
  coverImage?: string
  dateRange: string
  couponCode?: string
  percentage: number
  contactName: string
  contactEmail: string
} | null

type AddDealContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  newDealData: NewDealType
  updateNewDealDetails: (dealDetails: Partial<NewDealType>) => void
  dataLoaded: boolean
}

// prettier-ignore
export const AddDealContext = createContext < AddDealContextType | null>(null)

export const AddDealContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [newDealData, setNewDealData] = useState<NewDealType>({
    productName: '',
    category: 'Select a Category',
    url: '',
    summary: '',
    coverImage: '',
    dateRange: '',
    couponCode: '',
    percentage: 0,
    contactName: '',
    contactEmail: '',
  })
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    readFromLocalStorage()
    setDataLoaded(true)
  }, [])

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newDealData)
    }
  }, [newDealData, dataLoaded])

  const updateNewDealDetails = (dealDetails: Partial<NewDealType>) => {
    setNewDealData(
      (prev) =>
        ({
          ...prev,
          ...dealDetails,
        }) as NewDealType
    )
  }

  const saveDataToLocalStorage = (currentDealData: NewDealType) => {
    localStorage.setItem('newDealData', JSON.stringify(currentDealData))
  }

  const readFromLocalStorage = () => {
    const defaultData = {
      productName: '',
      category: 'Select a Category',
      url: '',
      summary: '',
      coverImage: '',
      dateRange: '',
      couponCode: '',
      percentage: 0,
      contactName: '',
      contactEmail: '',
    }
    const loadedDataString = localStorage.getItem('newDealData')

    if (!loadedDataString) return setNewDealData(defaultData)

    try {
      const parsed = newDealSchema.parse(JSON.parse(loadedDataString))
      setNewDealData(parsed)
    } catch (error) {
      setNewDealData(defaultData)
    }
  }

  const contextValue = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      newDealData,
      setNewDealData,
      dataLoaded,
      setDataLoaded,
      updateNewDealDetails,
    }),
    [currentStep, newDealData, dataLoaded]
  )

  return (
    <AddDealContext.Provider value={contextValue}>
      {children}
    </AddDealContext.Provider>
  )
}

export function useAddDealContext() {
  const context = useContext(AddDealContext)
  if (context === null) {
    throw new Error(
      'useAddDealContext must be used within a AddDealContextProvider'
    )
  }
  return context
}
