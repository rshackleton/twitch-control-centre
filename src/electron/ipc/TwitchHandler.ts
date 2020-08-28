import { ipcMain, BrowserWindow } from 'electron';
import { PubSubRedemptionMessage, PubSubListener, PubSubMessage } from 'twitch-pubsub-client/lib';

import { IpcChannels } from '../../enums/IpcChannels';

import ConfigurationService from '../services/ConfigurationService';
import LifxService from '../services/LifxService';

import TwitchApiClient from '../TwitchApiClient';

const client = new TwitchApiClient();

export interface TwitchRedemptionData {
  id: string;
  rewardName: string;
  userDisplayName: string;
  userId: string;
  userName: string;
}

export default class TwitchHandler {
  private config: ConfigurationService;
  private lifxService: LifxService;
  private subscription: PubSubListener<PubSubMessage> | null = null;
  private window: BrowserWindow | null = null;

  constructor() {
    this.config = new ConfigurationService();
    this.lifxService = new LifxService();
  }

  async register(window: BrowserWindow): Promise<void> {
    this.window = window;

    ipcMain.handle(IpcChannels.TWITCH_PUBSUB_START, async () => {
      console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: Called`);

      await client.initialise();

      console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: Initialised client`);

      if (!this.subscription) {
        console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: No subscription found.`);
        this.subscription = await client.redemption(this.listener.bind(this));
        console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: New subscription created.`);
      }
    });

    ipcMain.handle(IpcChannels.TWITCH_PUBSUB_STOP, () => {
      console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_STOP}: Called`);

      if (this.subscription) {
        console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: Subscription found.`);
        this.subscription.remove();
        this.subscription = null;
        console.log(`TwitchHandler: ${IpcChannels.TWITCH_PUBSUB_START}: Subscription removed.`);
      }
    });
  }

  listener(message: PubSubRedemptionMessage): void {
    console.log(`TwitchHandler: Called listener`, message);

    // Send event to window to display in output log.
    const webContents = this.window?.webContents;

    if (webContents) {
      const data: TwitchRedemptionData = {
        id: message.rewardId,
        rewardName: message.rewardName,
        userDisplayName: message.userDisplayName,
        userId: message.userId,
        userName: message.userName,
      };

      webContents.send(IpcChannels.TWITCH_PUBSUB_EVENT, data);
    }

    // Trigger appropriate LIFX change.
    const appConfig = this.config.get();
    const states = appConfig.lifxStates ?? {};
    const state = states[message.rewardId];
    const id = appConfig.selectedLightId;

    if (id && state) {
      this.lifxService.setState(`id:${id}`, state);
    }
  }
}
