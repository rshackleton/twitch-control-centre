export type RewardFormData = {
  rewardId: string;
};

export interface RewardFormProps {
  onSubmit: (formData: RewardFormData) => void;
}
