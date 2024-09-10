import React from 'react'
import LoadingText, { LOADING_TEXT_WIDTHS } from './LoadingText'

export default function LoadingTag() {
  return (
    <LoadingText
      width={LOADING_TEXT_WIDTHS.XS}
      className="border-1 rounded-2xl border-gray-700 px-3 py-2"
    />
  )
}
