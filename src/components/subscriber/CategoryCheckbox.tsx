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
  let categoryName =
    category.split('Notifications')[0].charAt(0).toUpperCase() +
    category.split('Notifications')[0].slice(1)

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
          {isChecked && <MdCheck />}
        </span>
      </label>
      <span className="mt-[2.5px] text-sm font-extralight md:mt-3 md:text-[28px]">
        {categoryName != 'Misc' ? categoryName + 's' : 'Misc'}
      </span>
    </>
  )
}
