import { Textarea as TextareaDefault } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { camelCase } from '@/lib/utils'

type InputProps = {
  label: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({ label, value, onChange }: InputProps) {
  const labelCamelCase = camelCase(label)

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={labelCamelCase} className="text-2xl font-extralight">
        {label}
      </Label>
      <TextareaDefault
        id={labelCamelCase}
        name={labelCamelCase}
        className="h-44 bg-transparent text-xl"
        value={value}
        onChange={(e) => onChange(e)}
        required
      />
    </div>
  )
}
