'use client'
import { useState } from 'react'
import { updateSubscriberPreferences } from '@/lib/queries'
import toast from 'react-hot-toast'
import CategoryCheckbox from './CategoryCheckbox'
import { Status } from '@/types/Types'
import { Subscriber as SubscriberType } from '@prisma/client'
import { Button } from '../ui/button'
import Section from '../Section'

export default function Subscriber({
  subscriber,
}: {
  subscriber: SubscriberType
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

  //TODO: Iterate through ENUM for categories
  //TODO: Add category table to Xata
  //TODO: Update name with ENUM category value.
  const subscribedCategories = [
    {
      name: 'courseNotifications',
      subscribed: subscriberData.courseNotifications,
    },
    {
      name: 'officeEquipmentNotifications',
      subscribed: subscriberData.officeEquipmentNotifications,
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

  const updateAllSubscriptions = async (subscribedStatus: boolean) => {
    // Create a new object with the updated values
    const newData = {
      ...subscriberData,
      courseNotifications: subscribedStatus,
      officeEquipmentNotifications: subscribedStatus,
      ebookNotifications: subscribedStatus,
      toolNotifications: subscribedStatus,
      conferenceNotifications: subscribedStatus,
      miscNotifications: subscribedStatus,
      status: subscribedStatus ? Status.SUBSCRIBED : Status.UNSUBSCRIBED,
    }

    // Update the state
    setSubscriberData((prevData) => ({
      ...prevData,
      ...newData,
    }))

    //TODO: Look if updatePref is REALLY being used as a server action or server component
    // Update the database
    try {
      await updateSubscriberPreferences(subscriberData.xata_id, newData) //TODO: Fix type error for newData
      toast.success(
        `You have been ${
          subscribedStatus ? 'subscribed to' : 'unsubscribed from'
        } all notifications!`
      )
    } catch (error) {
      toast.error(`Failed to update database: ${error}`)
    }
  }

  return (
    <Section className="w-full">
      {/* subscribe and unsubscribe from all buttons */}
      <div className="mb-10 flex w-full justify-between">
        <Button
          variant="outline-success"
          size="lg"
          onClick={() => updateAllSubscriptions(true)}
        >
          Subscribe to all
        </Button>

        <Button
          variant="outline-destructive"
          size="lg"
          onClick={() => updateAllSubscriptions(false)}
        >
          Unsubscribe from all
        </Button>
      </div>

      {/* checkboxes */}
      <ul className="flex flex-col gap-6 md:gap-12">
        {subscribedCategories.map((category, index) => (
          <li key={category.name + index} className="flex gap-8 md:gap-16">
            <CategoryCheckbox
              isChecked={category.subscribed || false}
              category={category.name}
              handleChange={handleChange}
            />
          </li>
        ))}
      </ul>

      <Button
        className=""
        variant="primary"
        size="lg"
        onClick={async () => {
          await updateSubscriberPreferences(
            subscriberData.xata_id,
            subscriberData
          ) //TODO: Fix type error for subscriberData
          toast.success('Preferences updated!')
          setUpdate(false)
        }}
        disabled={!update}
      >
        Update Preferences
      </Button>
    </Section>
  )
}
