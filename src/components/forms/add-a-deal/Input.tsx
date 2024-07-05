import { Input as InputDefault } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { camelCase } from '@/lib/utils'
import { cn } from '@/lib/utils'

type InputProps = {
  label: string
  required?: boolean
  type?: string
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
}

export default function Input({
  label,
  required = true,
  type = 'text',
  value,
  onChange,
  className,
  placeholder,
}: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label
        htmlFor={labelCamelCase}
        className="text-base font-extralight md:text-2xl"
      >
        {label}
      </Label>
      <InputDefault
        id={labelCamelCase}
        name={labelCamelCase}
        type={type}
        className="h-8 bg-transparent text-base focus-visible:outline-none focus-visible:ring-offset-teal-500 md:h-16 md:text-xl"
        required={required}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    </div>
  )
}
