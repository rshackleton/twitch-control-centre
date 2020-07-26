import { ApiClient, HelixUser, StaticAuthProvider, RefreshableAuthProvider } from 'twitch';

import PubSubClient, { PubSubRedemptionMessage, PubSubListener } from 'twitch-pubsub-client';

import CredentialsManager from './CredentialsManager';

class TwitchApiClient {
  private apiClient: ApiClient;
  private credentials: CredentialsManager;
  private pubSubClient: PubSubClient;
  private userInfo: HelixUser;

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
    const clientId = await this.credentials.getPassword('twitch-client-id');
    const clientSecret = await this.credentials.getPassword('twitch-client-secret');

    // Managed using OAuth flow.
    const accessToken = await this.credentials.getPassword('twitch-access-token');
    const refreshToken = await this.credentials.getPassword('twitch-refresh-token');

    // Create API client.
    this.apiClient = new ApiClient({
      authProvider: new RefreshableAuthProvider(new StaticAuthProvider(clientId, accessToken), {
        clientSecret,
        refreshToken,
        onRefresh: async (token): Promise<void> => {
          await this.credentials.setPassword('twitch-access-token', token.accessToken);
          await this.credentials.setPassword('twitch-refresh-token', token.refreshToken);
        },
      }),
    });

    // Fetch user info for token provided.
    this.userInfo = await this.apiClient.helix.users.getMe();

    // Create PubSub client.
    this.pubSubClient = new PubSubClient();
    await this.pubSubClient.registerUserListener(this.apiClient, this.userInfo);
  }

  /** Register a listener to channel point redemption topic. */
  redemption(callback: (message: PubSubRedemptionMessage) => void): Promise<PubSubListener> {
    return this.pubSubClient.onRedemption(this.userInfo, callback);
  }
}

export default TwitchApiClient;
