'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  NewDealInitialValuesType,
  NewDealType,
  newDealInitialValuesSchema,
} from '@/app/(public-pages)/deals/add/schemas'

const defaultDeal: NewDealInitialValuesType = {
  name: '',
  category: '',
  link: '',
  description: '',
  coverImageURL: '',
  coverImageId: '',
  tags: [],
  startDate: new Date().toISOString(),
  endDate: undefined,
  coupon: '',
  couponPercent: undefined,
  contactName: '',
  contactEmail: '',
}

type AddDealContextType = {
  newDealData: NewDealInitialValuesType
  updateNewDealDetails: (dealDetails: Partial<NewDealType>) => void
  dataLoaded: boolean
  resetData: () => void
}

// prettier-ignore
export const AddDealContext = createContext<AddDealContextType | null>(null)

export const AddDealContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [newDealData, setNewDealData] =
    useState<NewDealInitialValuesType>(defaultDeal)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    readFromLocalStorage()
    setDataLoaded(true)
  }, [])

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newDealData)
    }
  }, [newDealData, dataLoaded])

  //TODO handle memoization
  const updateNewDealDetails = useCallback(
    (dealDetails: Partial<NewDealType>) => {
      setNewDealData({ ...newDealData, ...dealDetails })
    },
    [newDealData]
  )

  const saveDataToLocalStorage = (
    currentDealData: NewDealInitialValuesType
  ) => {
    localStorage.setItem(
      'deals-for-devs-newDealData',
      JSON.stringify(currentDealData)
    )
  }

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem('deals-for-devs-newDealData')
    if (!loadedDataString) return setNewDealData(defaultDeal)
    const validated = newDealInitialValuesSchema.safeParse(
      JSON.parse(loadedDataString)
    )

    if (validated.success) {
      setNewDealData(validated.data)
    } else {
      setNewDealData(defaultDeal)
    }
  }
  const resetData = () => {
    setNewDealData(defaultDeal)
  }

  const contextValue = useMemo(
    () => ({
      newDealData,
      dataLoaded,
      updateNewDealDetails,
      resetData,
    }),
    [newDealData, dataLoaded, updateNewDealDetails]
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
