import { useState } from 'react';
import { toast } from 'sonner';

interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox' | 'radio';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface UseWhatsAppFormOptions {
  whatsappNumber: string; // Formato: 551122835007
  businessName?: string;
  fields: FormField[];
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Hook para integrar formulário com WhatsApp
 * 
 * Uso:
 * const { formData, handleChange, handleSubmit } = useWhatsAppForm({
 *   whatsappNumber: '551122835007',
 *   businessName: 'Bem Te Vi',
 *   fields: [
 *     { name: 'name', label: 'Nome', type: 'text' },
 *     { name: 'email', label: 'Email', type: 'email' },
 *   ]
 * });
 */
export function useWhatsAppForm(options: UseWhatsAppFormOptions) {
  const { whatsappNumber, businessName = 'Nossa Empresa', fields, onSuccess, onError } = options;
  
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {})
  );

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    const requiredFields = fields.filter(f => f.type !== 'checkbox');
    const emptyFields = requiredFields.filter(f => !formData[f.name]);
    
    if (emptyFields.length > 0) {
      const message = `Por favor, preencha: ${emptyFields.map(f => f.label).join(', ')}`;
      toast.error(message);
      onError?.(message);
      return;
    }

    // Formata a mensagem para o WhatsApp
    let message = `Olá! Recebi uma solicitação via formulário de ${businessName}:\n\n`;
    
    fields.forEach(field => {
      const value = formData[field.name];
      if (value || field.type === 'checkbox') {
        const displayValue = field.type === 'checkbox' ? (value ? 'Sim' : 'Não') : value;
        message += `*${field.label}:* ${displayValue}\n`;
      }
    });

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mostra confirmação
    toast.success('Redirecionando para WhatsApp...');

    // Reseta o formulário
    const resetData = fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {});
    setTimeout(() => {
      setFormData(resetData);
      onSuccess?.();
    }, 1000);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm: () => {
      const resetData = fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {});
      setFormData(resetData);
    }
  };
}
