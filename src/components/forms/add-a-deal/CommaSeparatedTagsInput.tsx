import React, { useEffect, useState } from 'react'
import Input from './Input'
import Tag from './Tag'
import TagsList from './TagsList'

interface CommaSeparatedTagsProps {
  handleTagsUpdated: (tags: string[]) => void
  initialTags?: string[]
}

export default function CommaSeparatedTags({
  handleTagsUpdated,
  initialTags = [],
}: CommaSeparatedTagsProps) {
  const [tagsInput, setTagsInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialTags)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastLetter = e.target.value.slice(-1)
    setTagsInput(e.target.value)
    if (lastLetter === ',') {
      const tag = e.target.value.trim().toLowerCase().slice(0, -1)

      const updatedTags = [...tags, tag]
      setTags(updatedTags)
      handleTagsUpdated(updatedTags)
      setTagsInput('')
    }
  }

  const handleDelete = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag)
    setTags(updatedTags)
    handleTagsUpdated(updatedTags)
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
      {tags?.map((tag, index) => (
        <input
          key={tag}
          type="text"
          hidden
          name={`tag`}
          defaultValue={tag}
        ></input>
      ))}
      <TagsList tags={tags || []} handleDelete={handleDelete} />
    </div>
  )
}
