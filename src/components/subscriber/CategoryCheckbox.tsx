import { MdCheck } from 'react-icons/md'

interface CategoryCheckboxProps {
  isChecked: boolean
  category: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CategoryCheckbox({
  isChecked,
  category,
  handleChange,
}: CategoryCheckboxProps) {
  const getCategoryName = (category: string) => {
    // Return the category name
    if (category === 'officeEquipmentNotifications') {
      return 'Office Equipment'
    } else if (category === 'miscNotifications') {
      return 'Misc'
    } else {
      return (
        category.split('Notifications')[0].charAt(0).toUpperCase() +
        category.split('Notifications')[0].slice(1) +
        's'
      )
    }
  }

  let categoryName = getCategoryName(category)

  return (
    <>
      <label className="custom-checkbox cursor-pointer">
        <input
          name={category}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="checkmark flex h-7 w-7 items-center justify-center md:h-12 md:w-12">
          {isChecked && <MdCheck className="md:text-3xl" />}
        </span>
      </label>
      <span className="mt-[2.5px] text-sm font-extralight md:mt-3 md:text-[28px]">
        {categoryName}
      </span>
    </>
  )
}
