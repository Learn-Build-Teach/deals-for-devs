import { Category } from '@/types/Types'
import React from 'react'
import {
  FaBeer,
  FaBook,
  FaCalendar,
  FaChair,
  FaCog,
  FaCompactDisc,
  FaDeskpro,
  FaDesktop,
  FaMicrophone,
  FaSchool,
  FaTable,
  FaTag,
  FaVideo,
} from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface DealGradientPlaceholderProps {
  category: Category
}

//TODO: how to use enum keys/values instead of hard-coded values?
const categoryToGradient: { [key: string]: string } = {
  MISC: 'from-indigo-100  to-indigo-300',
  EBOOKS: 'from-lime-100  to-lime-300',
  COURSES: 'from-amber-100  to-amber-300',
  TOOLS: 'from-red-100  to-red-300',
  CONFERENCES: 'from-pink-100  to-pink-300',
  BOOTCAMPS: 'from-orange-100  to-orange-300',
  'OFFICE EQUIPMENT': 'from-teal-100  to-teal-300',
}
const categoryToIcon: { [key: string]: JSX.Element } = {
  MISC: <FaTag className="h-16 w-16" />,
  EBOOKS: <FaBook className="h-16 w-16" />,
  COURSES: <FaDesktop className="h-16 w-16" />,
  TOOLS: <FaCog className="h-16 w-16" />,
  CONFERENCES: <FaMicrophone className="h-16 w-16" />,
  BOOTCAMPS: <FaSchool className="h-16 w-16" />,
  'OFFICE EQUIPMENT': <FaChair className="h-16 w-16" />,
}

export default function DealGradientPlaceholder({
  category,
}: DealGradientPlaceholderProps) {
  return (
    <div
      className={twMerge(
        'flex aspect-video w-full items-center justify-center rounded-2xl bg-gradient-to-r group-hover:outline group-hover:outline-teal-500',
        categoryToGradient[category || 'MISC']
      )}
    >
      <div className="h-16 w-16 text-gray-900">
        {categoryToIcon[category || 'MISC']}
      </div>
    </div>
  )
}
