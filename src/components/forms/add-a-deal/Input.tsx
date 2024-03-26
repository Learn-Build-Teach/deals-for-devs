import { Input as InputDefault } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { camelCase } from '@/lib/utils'

type InputProps = {
  label: string
}

export default function Input({ label }: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={labelCamelCase} className="text-2xl font-extralight">
        {label}
      </Label>
      <InputDefault
        id={labelCamelCase}
        name={labelCamelCase}
        type="text"
        className="h-16 bg-transparent text-xl"
      />
    </div>
  )
}
