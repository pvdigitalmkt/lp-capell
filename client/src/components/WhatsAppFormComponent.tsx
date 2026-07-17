import { useWhatsAppForm } from '@/hooks/useWhatsAppForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WhatsAppFormProps {
  whatsappNumber: string;
  businessName?: string;
  title?: string;
  description?: string;
  fields: Array<{
    name: string;
    label: string;
    type?: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox' | 'radio';
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
  }>;
  buttonText?: string;
  onSuccess?: () => void;
}

export function WhatsAppForm({
  whatsappNumber,
  businessName = 'Nossa Empresa',
  title = 'Fale Conosco',
  description = 'Preencha o formulário e envie via WhatsApp',
  fields,
  buttonText = 'Enviar via WhatsApp',
  onSuccess,
}: WhatsAppFormProps) {
  const { formData, handleChange, handleSubmit } = useWhatsAppForm({
    whatsappNumber,
    businessName,
    fields,
    onSuccess,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
      {description && <p className="text-foreground/70 mb-8">{description}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'checkbox' ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={formData[field.name]}
                  onCheckedChange={(checked) => handleChange(field.name, checked)}
                />
                <Label htmlFor={field.name} className="font-normal cursor-pointer">
                  {field.label}
                </Label>
              </div>
            ) : field.type === 'radio' ? (
              <div>
                <Label className="font-semibold mb-3 block">{field.label}</Label>
                <RadioGroup
                  value={formData[field.name]}
                  onValueChange={(value) => handleChange(field.name, value)}
                >
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                      <Label htmlFor={`${field.name}-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field.type === 'select' ? (
              <div>
                <Label htmlFor={field.name} className="font-semibold">
                  {field.label}
                </Label>
                <Select value={formData[field.name]} onValueChange={(value) => handleChange(field.name, value)}>
                  <SelectTrigger id={field.name} className="mt-2">
                    <SelectValue placeholder={field.placeholder || 'Selecione...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.type === 'textarea' ? (
              <div>
                <Label htmlFor={field.name} className="font-semibold">
                  {field.label}
                </Label>
                <Textarea
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-2 min-h-24"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor={field.name} className="font-semibold">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-2"
                  required={field.required}
                />
              </div>
            )}
          </div>
        ))}

        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
