import React, { useEffect, useState } from 'react'
import Input from './Input'
import Tag from './Tag'
import { useAddDealContext } from '@/context/AddDealContext'
import TagsList from './TagsList'

export default function CommaSeparatedTags() {
  const { newDealData, updateNewDealDetails } = useAddDealContext()

  const [tagsInput, setTagsInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastLetter = e.target.value.slice(-1)
    setTagsInput(e.target.value)
    if (lastLetter === ',') {
      const tag = e.target.value.trim().toLowerCase().slice(0, -1)
      console.log(tag)
      updateNewDealDetails({ tags: [...(newDealData.tags || []), tag] })
      setTagsInput('')
    }
  }

  const handleDelete = (tag: string) => {
    updateNewDealDetails({ tags: newDealData.tags?.filter((t) => t !== tag) })
  }

  return (
    <div>
      <Input
        label="Tags*"
        name="tags"
        description="Enter any relevant tags separated by commas"
        required={false}
        value={tagsInput}
        onChange={handleInputChange}
      />
      {newDealData.tags?.map((tag, index) => (
        <input
          key={tag}
          type="text"
          hidden
          name={`tag`}
          defaultValue={tag}
        ></input>
      ))}
      <TagsList tags={newDealData.tags || []} handleDelete={handleDelete} />
    </div>
  )
}
