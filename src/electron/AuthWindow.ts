import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BrowserWindow } from 'electron';
import url from 'url';

import envVariables from '../../env-variables.json';

import { Credentials } from '../enums/Credentials';

import CredentialsManager from './CredentialsManager';

const { twitchAppClientId, twitchAppClientSecret, twitchAppRedirectUri } = envVariables;

const credentials = new CredentialsManager();

interface TwitchApiTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: Array<string>;
  token_type: 'bearer';
}

class AuthWindow {
  private parentWindow: BrowserWindow;
  private url: string;
  private window: BrowserWindow;

  constructor(parentWindow: BrowserWindow) {
    this.parentWindow = parentWindow;
    this.url = createCodeUrl();
  }

  async showWindow(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.window = new BrowserWindow({
        width: 640,
        height: 480,
        frame: false,
        modal: true,
        parent: this.parentWindow,
        show: false,
        webPreferences: {
          enableRemoteModule: false,
          nodeIntegration: false,
        },
      });

      this.window.loadURL(this.url);

      this.window.once('ready-to-show', () => {
        this.window.show();
      });

      const {
        session: { webRequest },
      } = this.window.webContents;

      const filter = {
        urls: [`${twitchAppRedirectUri}*`],
      };

      webRequest.onBeforeRequest(filter, async ({ url: callbackUrl }) => {
        const urlParts = url.parse(callbackUrl, true);

        const options: AxiosRequestConfig = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          url: createTokenUrl(urlParts.query.code as string),
        };

        try {
          const response = (await axios(options)) as AxiosResponse<TwitchApiTokenResponse>;

          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;

          if (refreshToken) {
            await credentials.setPassword(Credentials.TWITCH_ACCESS_TOKEN, accessToken);
            await credentials.setPassword(Credentials.TWITCH_REFRESH_TOKEN, refreshToken);
          }

          resolve();
        } catch (error) {
          reject(error);
        } finally {
          this.window.close();
        }
      });

      this.window.on('closed', () => {
        this.window = null;
      });
    });
  }
}

export default AuthWindow;

function createCodeUrl(): string {
  return `https://id.twitch.tv/oauth2/authorize?client_id=${twitchAppClientId}&redirect_uri=http://localhost/callback&response_type=code&scope=channel:read:redemptions`;
}

function createTokenUrl(code: string): string {
  return `https://id.twitch.tv/oauth2/token?client_id=${twitchAppClientId}&client_secret=${twitchAppClientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${twitchAppRedirectUri}`;
}
