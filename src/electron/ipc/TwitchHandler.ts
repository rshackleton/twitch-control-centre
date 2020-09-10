// import Audic from 'audic/dist/index';
import { ipcMain, BrowserWindow } from 'electron';
import fs from 'fs';
import util from 'util';
import { PubSubRedemptionMessage, PubSubListener, PubSubMessage } from 'twitch-pubsub-client/lib';

import { IpcChannels } from '../../enums/IpcChannels';
import { LightState, AppTriggerType, AppActionType, AppAction } from '../../types';

import ConfigurationService from '../services/ConfigurationService';
import LifxService from '../services/LifxService';

import TwitchApiClient from '../TwitchApiClient';

const readFile = util.promisify(fs.readFile);

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

    const action = Object.values(appConfig.actions).find(
      (action) =>
        action.triggerType === AppTriggerType.REWARD &&
        action.triggerData.rewardId === message.rewardId,
    );

    if (!action) {
      console.log(`Action not found for reward id (${message.rewardId})`);
      return;
    }

    if (action.actionType === AppActionType.LIFX) {
      console.log(`LIFX Action: ${action.actionData.lightId}`);
      this.handleLifx(action);
      return;
    }

    if (action.actionType === AppActionType.SFX) {
      console.log(`SFX Action: ${action.actionData.audioFile}`);
      this.handleSfx(action);
      return;
    }

    console.log(`Unexpected action type: ${action.actionType}`);
  }

  async handleLifx(action: AppAction): Promise<void> {
    const id = action.actionData.lightId as string;
    const state: LightState = {
      brightness: action.actionData.brightness as number,
      color: action.actionData.color as string,
      duration: action.actionData.duration as number,
      power: action.actionData.power as 'on' | 'off',
    };

    if (id && state) {
      console.log(`Setting light state for light ${id}`);
      this.lifxService.setState(`id:${id}`, state);
    }
  }

  async handleSfx(action: AppAction): Promise<void> {
    // @todo: Send the playback data to a separate hidden audio playback window.
    const audioFilePath = action.actionData.audioFile as string;
    const buffer = await readFile(audioFilePath);
    const base64 = buffer.toString('base64');
    const webContents = this.window?.webContents;
    webContents?.send(IpcChannels.AUDIO_PLAY, `data:audio/mp3;base64,${base64}`);
  }
}
