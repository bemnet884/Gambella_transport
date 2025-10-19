// components/ui/FormField.tsx
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleFormData } from "@/zod";

interface FormFieldProps {
  name: keyof VehicleFormData["description"];
  label: string;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
}

export function FormField({
  name,
  label,
  placeholder,
  type = "text",
  step,
  required = false
}: FormFieldProps) {
  const { register, formState: { errors, touchedFields, isSubmitting } } = useFormContext<VehicleFormData>();

  const fieldError = errors.description?.[name];
  const isTouched = touchedFields.description?.[name];

  // Only show error if field was touched or there's a submission error
  const showError = (isSubmitting || isTouched) && fieldError;

  // Safely get error message
  const getErrorMessage = () => {
    if (!fieldError?.message) return '';
    return typeof fieldError.message === 'string' ? fieldError.message : String(fieldError.message);
  };

  return (
    <div>
      <Label htmlFor={name} className="mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        step={step}
        placeholder={placeholder}
        {...register(`description.${name}`)}
        className={showError ? "border-red-500" : ""}
      />
      {showError && (
        <p className="text-red-500 text-sm mt-1">
          {getErrorMessage()}
        </p>
      )}
    </div>
  );
}