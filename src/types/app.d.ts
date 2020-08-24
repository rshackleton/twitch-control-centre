import { Lifx } from './lifx';

interface AppConfig {
  lifxStates: Record<string, Lifx.LightState>;
  selectedLightId: string;
}
