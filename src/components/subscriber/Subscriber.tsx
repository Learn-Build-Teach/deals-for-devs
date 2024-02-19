'use client'
import { useState } from 'react'
import { Subscribers } from '@/xata'
import { updatePreferences } from '@/actions/subscriber-update'
import toast from 'react-hot-toast'
import CategoryCheckbox from './CategoryCheckbox'

export default function Subscriber({
  subscriber,
}: {
  subscriber: Subscribers
}) {
  const [subscriberData, setSubscriberData] = useState(subscriber)
  const [update, setUpdate] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setSubscriberData((prevData) => ({
      ...prevData,
      [name]: checked,
    }))

    setUpdate(true)
  }

  const subscribedCategories = [
    {
      name: 'courseNotifications',
      subscribed: subscriberData.courseNotifications,
    },
    {
      name: 'ebookNotifications',
      subscribed: subscriberData.ebookNotifications,
    },
    { name: 'toolNotifications', subscribed: subscriberData.toolNotifications },
    {
      name: 'conferenceNotifications',
      subscribed: subscriberData.conferenceNotifications,
    },
    { name: 'miscNotifications', subscribed: subscriberData.miscNotifications },
  ]

  const updateSubscriptions = async (val: boolean) => {
    // Create a new object with the updated values
    const newData = {
      ...subscriberData,
      courseNotifications: val,
      ebookNotifications: val,
      toolNotifications: val,
      conferenceNotifications: val,
      miscNotifications: val,
      status: val ? 'subscribed' : 'unsubscribed',
    }

    // Update the state
    setSubscriberData((prevData) => ({
      ...prevData,
      ...newData,
    }))

    // Update the database
    try {
      await updatePreferences(subscriberData.id, newData)
      toast.success(
        `You have been ${
          val ? 'subscribed to' : 'unsubscribed from'
        } all notifications!`
      )
    } catch (error) {
      toast.error(`Failed to update database: ${error}`)
    }
  }

  return (
    <>
      <div className="w-full max-w-[350px] md:max-w-[760px]">
        {/* subscribe and unsubscribe from all buttons */}
        <div className="mb-8 flex w-full justify-between">
          <button
            className="text-xs font-light md:text-[28px]"
            onClick={() => updateSubscriptions(true)}
          >
            Subscribe to all
          </button>

          <button
            className="rounded-md border border-red-400 bg-transparent px-3.5 py-2.5 text-center text-xs font-light text-red-400 shadow-sm hover:bg-red-400 hover:text-red-900 md:py-4 md:text-[28px]"
            onClick={() => updateSubscriptions(false)}
          >
            Unsubscribe from all
          </button>
        </div>

        {/* checkboxes */}
        <ul className="flex flex-col gap-6 md:gap-12">
          {subscribedCategories.map((category, index) => (
            <li key={index} className="flex gap-8 md:gap-16">
              <CategoryCheckbox
                isChecked={category.subscribed || false}
                category={category.name}
                handleChange={handleChange}
              />
            </li>
          ))}
        </ul>

        <button
          className="mb-80 mt-9 w-full rounded-md bg-teal-600 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-teal-400 disabled:cursor-not-allowed disabled:border  disabled:border-teal-500 disabled:bg-transparent disabled:text-teal-500 md:mt-20 md:py-4 md:text-2xl"
          onClick={async () => {
            await updatePreferences(subscriberData.id, subscriberData)
            toast.success('Preferences updated!')
            setUpdate(false)
          }}
          disabled={!update}
        >
          Update Preferences
        </button>
      </div>
    </>
  )
}
