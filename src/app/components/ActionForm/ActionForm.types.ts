import { AppActionFormData } from '@src/types';

export interface ActionFormProps {
  initialData: Partial<AppActionFormData> | null;
  onBack: () => void;
  onSubmit: (formData: AppActionFormData) => void;
}
