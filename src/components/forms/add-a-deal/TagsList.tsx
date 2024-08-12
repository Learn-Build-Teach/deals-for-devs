import React from 'react'
import Tag from './Tag'

interface TagsListProps {
  tags: string[]
  handleDelete?: (tag: string) => void
}
export default function TagsList({ tags, handleDelete }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4">
      {tags?.map((tag, index) => (
        <Tag key={index} text={tag} handleDelete={handleDelete} />
      ))}
    </div>
  )
}
