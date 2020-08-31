export interface Light {
  id: string;
  brightness: number;
  color: {
    hue: number;
    kelvin: number;
    saturation: number;
  };
  group: LightGroup;
  label: string;
  power: 'on' | 'off';
}

export interface LightGroup {
  id: string;
  name: string;
}

export interface SetStateResponse {
  results: SetStateResponseItem[];
}

export interface SetStateResponseItem {
  id: string;
  label: string;
  status: string;
}

export type ErrorResponse = [number, string];

export interface LightState {
  brightness: number;
  color: string;
  duration: number;
  power: 'on' | 'off';
}
