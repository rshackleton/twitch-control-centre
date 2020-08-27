import { ApiClient, HelixUser, StaticAuthProvider, RefreshableAuthProvider } from 'twitch';

import { PubSubClient, PubSubRedemptionMessage, PubSubListener } from 'twitch-pubsub-client';

import envVariables from '../../env-variables.json';

import { Credentials } from '../enums/Credentials';

import CredentialsManager from './CredentialsManager';

const { twitchAppClientId, twitchAppClientSecret } = envVariables;

class TwitchApiClient {
  private apiClient?: ApiClient;
  private credentials: CredentialsManager;
  private pubSubClient?: PubSubClient;
  private userInfo?: HelixUser;

  constructor() {
    this.credentials = new CredentialsManager();
  }

  /** Configure client with saved credentials. */
  async initialise(): Promise<void> {
    // @note:
    // 1. Retrieve refresh token.
    // 2. Generate new access token with required scopes.
    // 3. Create auth provider instance with access token.
    // 4. Profit.

    // Managed using credentials form.
    const clientId = twitchAppClientId;
    const clientSecret = twitchAppClientSecret;

    // Managed using OAuth flow.
    const accessToken = (await this.credentials.getPassword('twitch-access-token')) ?? '';
    const refreshToken = (await this.credentials.getPassword('twitch-refresh-token')) ?? '';

    // Create API client.
    this.apiClient = new ApiClient({
      authProvider: new RefreshableAuthProvider(new StaticAuthProvider(clientId, accessToken), {
        clientSecret,
        refreshToken,
        onRefresh: async (token): Promise<void> => {
          await this.credentials.setPassword(Credentials.TWITCH_ACCESS_TOKEN, token.accessToken);
          await this.credentials.setPassword(Credentials.TWITCH_REFRESH_TOKEN, token.refreshToken);
        },
      }),
    });

    // Fetch user info for token provided.
    this.userInfo = await this.apiClient.helix.users.getMe();

    console.log(this.userInfo.displayName);

    // Create PubSub client.
    this.pubSubClient = new PubSubClient();
    await this.pubSubClient.registerUserListener(this.apiClient, this.userInfo);
  }

  /** Register a listener to channel point redemption topic. */
  async redemption(callback: (message: PubSubRedemptionMessage) => void): Promise<PubSubListener> {
    console.log('TwitchApiClient.redemption: Called');

    if (!this.pubSubClient) {
      return Promise.reject();
    }

    if (!this.userInfo) {
      return Promise.reject();
    }

    console.log('TwitchApiClient.redemption: Creating subscription');
    const sub = await this.pubSubClient.onRedemption(this.userInfo, callback);
    console.log('TwitchApiClient.redemption: Created subscription');
    return sub;
  }
}

export default TwitchApiClient;
