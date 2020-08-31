export type RewardFormData = {
  id: string;
  name: string;
};

export interface RewardFormProps {
  initialData: Partial<RewardFormData> | null;
  onSubmit: (formData: RewardFormData) => void;
}
