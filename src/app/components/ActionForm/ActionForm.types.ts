export type ActionFormData = {
  id: string;
  name: string;
};

export interface ActionFormProps {
  initialData: Partial<ActionFormData> | null;
  onSubmit: (formData: ActionFormData) => void;
}
