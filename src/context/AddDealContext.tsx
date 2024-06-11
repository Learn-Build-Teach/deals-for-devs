'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { addDays } from 'date-fns'
import { ImageUploadStatus } from '@/types/Types'

const defaultDeal = {
  productName: '',
  category: '',
  url: '',
  description: '',
  coverImageURL: '',
  coverImageId: '',
  startDate: new Date().toISOString(),
  endDate: undefined,
  couponCode: '',
  percentage: undefined,
  contactName: '',
  contactEmail: '',
}

export const newDealSchema = z.object({
  productName: z.union([z.string().min(1), z.literal('')]),
  category: z.union([z.string().min(1), z.literal('')]),
  url: z.union([z.string(), z.literal('')]),
  description: z.union([z.string().min(1), z.literal('')]),
  coverImageURL: z.string().optional(),
  coverImageId: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  couponCode: z.string().optional(),
  percentage: z.number().optional(),
  contactName: z.union([z.string().min(1), z.literal('')]),
  contactEmail: z.union([z.string().min(1), z.literal('')]),
})

type NewDealType = z.infer<typeof newDealSchema>

type AddDealContextType = {
  currentStep: number
  setCurrentStep: (step: number) => void
  newDealData: NewDealType
  updateNewDealDetails: (dealDetails: Partial<NewDealType>) => void
  dataLoaded: boolean
  imageUploadStatus: ImageUploadStatus
  setImageUploadStatus: (status: ImageUploadStatus) => void
  imageUploadProgress: number
  setImageUploadProgress: (progress: number) => void
}

// prettier-ignore
export const AddDealContext = createContext<AddDealContextType | null>(null)

export const AddDealContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [newDealData, setNewDealData] = useState<NewDealType>(
    defaultDeal as NewDealType
  )
  const [dataLoaded, setDataLoaded] = useState(false)
  const [imageUploadStatus, setImageUploadStatus] = useState<ImageUploadStatus>(
    ImageUploadStatus.PENDING
  )
  const [imageUploadProgress, setImageUploadProgress] = useState(0)

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
    setNewDealData((currentData) => {
      const updatedData = { ...currentData, ...dealDetails }
      return updatedData as NewDealType
    })
  }

  const saveDataToLocalStorage = (currentDealData: NewDealType) => {
    localStorage.setItem(
      'deals-for-devs-newDealData',
      JSON.stringify(currentDealData)
    )
  }

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem('deals-for-devs-newDealData')

    if (!loadedDataString) return setNewDealData(defaultDeal)

    try {
      const parsed = newDealSchema.parse(JSON.parse(loadedDataString))
      setNewDealData(parsed)
    } catch (error) {
      setNewDealData(defaultDeal)
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
      imageUploadStatus,
      setImageUploadStatus,
      imageUploadProgress,
      setImageUploadProgress,
    }),
    [
      currentStep,
      newDealData,
      dataLoaded,
      imageUploadStatus,
      imageUploadProgress,
    ]
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
