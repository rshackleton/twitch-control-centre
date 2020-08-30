export interface LightSelectorProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
