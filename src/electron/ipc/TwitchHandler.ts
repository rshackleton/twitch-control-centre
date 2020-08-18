import { ipcMain, BrowserWindow } from 'electron';
import { PubSubRedemptionMessage, PubSubListener, PubSubMessage } from 'twitch-pubsub-client/lib';

import { IPCEvents } from '../../enums/IPCEvents';

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

    ipcMain.handle(IPCEvents.TWITCH_PUBSUB_START, async () => {
      console.log(`TwitchHandler: ${IPCEvents.TWITCH_PUBSUB_START}: Called`);

      await client.initialise();

      console.log(`TwitchHandler: ${IPCEvents.TWITCH_PUBSUB_START}: Initialised client`);

      if (!this.subscription) {
        this.subscription = await client.redemption(this.listener.bind(this));
      }
    });

    ipcMain.handle(IPCEvents.TWITCH_PUBSUB_STOP, () => {
      console.log(`TwitchHandler: ${IPCEvents.TWITCH_PUBSUB_STOP}: Called`);

      if (this.subscription) {
        this.subscription.remove();
        this.subscription = null;
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

      webContents.send(IPCEvents.TWITCH_PUBSUB_EVENT, data);
    }

    // Trigger appropriate LIFX change.
    const state = this.config.getStateForReward(message.rewardId);

    if (state) {
      const id = this.config.get('selectedLightId');

      if (id) {
        this.lifxService.setState(`id:${id}`, state);
      }
    }
  }
}
