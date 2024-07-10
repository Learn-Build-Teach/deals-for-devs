import { Textarea as TextareaDefault } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { camelCase, cn } from '@/lib/utils'

type InputProps = {
  label: string
  value?: string
  name: string
  error?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: () => void
}

export default function Textarea({
  label,
  value,
  onChange,
  name,
  error,
  required = false,
  onBlur,
}: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={labelCamelCase}
          className="text-base font-extralight md:text-2xl"
        >
          {label}
        </Label>
        <TextareaDefault
          id={labelCamelCase}
          name={name}
          className={cn(
            `h-22 bg-transparent text-sm  md:h-44 md:text-xl`,
            error ?
              'border-red-500 focus-visible:ring-offset-red-500'
            : 'focus-visible:ring-offset-teal-500'
          )}
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
          onBlur={onBlur}
        />
      </div>
      <div className="h-6">
        <small className="text-red-500">{error}</small>
      </div>
    </div>
  )
}
