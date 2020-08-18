import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { Credentials } from '../../enums/Credentials';
import { Lifx } from '../../lifx';

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

  async setState(state: Lifx.LightState): Promise<Lifx.SetStateResponse | Lifx.ErrorResponse> {
    return this.call<Lifx.LightState, Lifx.SetStateResponse>({
      url: 'https://api.lifx.com/v1/lights/group_id:daf2998fadd22e2159497b21f315837c/state',
      data: state,
      method: 'PUT',
    });
  }

  async call<TData, TResponse>(args: CallArgs<TData>): Promise<TResponse | Lifx.ErrorResponse> {
    const key = await this.credentials.getPassword(Credentials.LIFX_KEY);

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
