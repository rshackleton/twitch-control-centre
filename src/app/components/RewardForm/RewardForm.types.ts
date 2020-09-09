export type RewardFormData = {
  id: string;
  name: string;
};

export interface RewardFormProps {
  initialData: Partial<RewardFormData> | null;
  onBack: () => void;
  onSubmit: (formData: RewardFormData) => void;
}
