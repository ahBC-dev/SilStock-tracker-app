import {Label} from '@/components/ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

const InputField = ({
    name,
    label,
    placeholder,
    type = "text",
    register,
    error,
    validation,
    disabled,
    value
}: FormInputProps) => {
  // Don't pass value prop if using react-hook-form register (it manages value internally)
  // Only pass value if explicitly provided for controlled inputs
  const inputProps = register 
    ? register(name, validation)
    : { value, name, onChange: () => {} }
  
  return (
    <div className="space-y-2">
        <Label htmlFor={name} className='form-label'>
            {label}
        </Label>
        <Input 
            type={type}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
            suppressHydrationWarning
            {...inputProps}
        />
        {error && <p className='text-sm text-red-500'>{error.message}</p>}
    </div>
  )
}

export default InputField