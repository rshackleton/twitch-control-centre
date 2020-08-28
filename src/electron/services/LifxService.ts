import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { CredentialKey } from '../../enums/Credentials';
import { Lifx } from '../../types/lifx';

import CredentialsManager from '../CredentialsManager';

interface CallArgs<TData> {
  data?: TData;
  method?: Method;
  url: string;
}

export default class LifxService {
  private credentials: CredentialsManager;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  async getLights(): Promise<Lifx.Light[] | Lifx.ErrorResponse> {
    return this.call<void, Lifx.Light[]>({
      url: 'https://api.lifx.com/v1/lights/all',
      method: 'PUT',
    });
  }

  async setState(
    selector: string,
    state: Lifx.LightState,
  ): Promise<Lifx.SetStateResponse | Lifx.ErrorResponse> {
    return this.call<Lifx.LightState, Lifx.SetStateResponse>({
      url: `https://api.lifx.com/v1/lights/${selector}/state`,
      data: state,
      method: 'PUT',
    });
  }

  async call<TData, TResponse>(args: CallArgs<TData>): Promise<TResponse | Lifx.ErrorResponse> {
    const key = await this.credentials.getPassword(CredentialKey.LIFX_KEY);

    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      data: args.data,
      method: args.method ?? 'GET',
      url: args.url,
    };

    const response = (await axios(options)) as AxiosResponse<TResponse>;

    if (response.status !== 200) {
      return [response.status, response.statusText];
    }

    return response.data;
  }
}
