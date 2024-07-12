import { Input as InputDefault } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { camelCase } from '@/lib/utils'
import { cn } from '@/lib/utils'

type InputProps = {
  label: string
  description?: string
  required?: boolean
  type?: string
  value?: string | number
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  error?: string
  onBlur?: () => void
}

export default function Input({
  label,
  required = false,
  description,
  type = 'text',
  name,
  value,
  onChange,
  className,
  placeholder,
  error,
  onBlur,
}: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div className={className}>
      <div className={cn('flex flex-col gap-2')}>
        <Label
          htmlFor={labelCamelCase}
          className="text-base font-extralight md:text-2xl"
        >
          {label}
          {description && (
            <span className="block text-sm text-gray-300">{description}</span>
          )}
        </Label>
        <InputDefault
          id={labelCamelCase}
          name={name}
          type={type}
          className={cn(
            `h-8 bg-transparent text-base focus-visible:outline-none  md:h-16 md:text-xl`,
            error ?
              'border-red-500 focus-visible:ring-offset-red-500'
            : 'focus-visible:ring-offset-teal-500'
          )}
          required={required}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </div>
      <div className="h-6">
        <small className="text-red-500">{error}</small>
      </div>
    </div>
  )
}
