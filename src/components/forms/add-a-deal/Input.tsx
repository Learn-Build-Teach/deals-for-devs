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
}

export default function Input({
  label,
  required = true,
  type = 'text',
  value,
  onChange,
  className,
}: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={labelCamelCase} className="text-2xl font-extralight">
        {label}
      </Label>
      <InputDefault
        id={labelCamelCase}
        name={labelCamelCase}
        type={type}
        className="h-16 bg-transparent text-xl focus-visible:outline-none focus-visible:ring-offset-teal-500"
        required={required}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}
