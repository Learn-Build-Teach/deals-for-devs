import React from 'react'
import Icon from '../Icon'

export default function Footer() {
  return (
    <footer className=" py-2">
      <p className=" mb-2 flex items-center justify-end gap-x-2 text-sm text-gray-300">
        <span>Search powered by</span>{' '}
        <Icon id="xata" size={20} className="h-8 w-16 text-gray-300" />
      </p>
    </footer>
  )
}
