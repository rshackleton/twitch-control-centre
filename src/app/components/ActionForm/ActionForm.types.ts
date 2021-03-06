export type ActionFormData = {
  id: string;
  light: string;
  lightState: string;
  name: string;
  reward: string;
};

export interface ActionFormProps {
  initialData: Partial<ActionFormData> | null;
  onBack: () => void;
  onSubmit: (formData: ActionFormData) => void;
}
