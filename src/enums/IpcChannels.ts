export enum IpcChannels {
  AUDIO_PLAY = 'AUDIO_PLAY',

  CONFIG_GET = 'CONFIG_GET',
  CONFIG_SET = 'CONFIG_SET',

  CREDENTIALS_GET = 'CREDENTIALS_GET',
  CREDENTIALS_SET = 'CREDENTIALS_SET',

  LIFX_CALL_API = 'LIFX_CALL_API',

  OPEN_DIALOG = 'OPEN_DIALOG',

  TWITCH_AUTH_CLEAR = 'TWITCH_AUTH_CLEAR',
  TWITCH_AUTH_START = 'TWITCH_AUTH_START',
  TWITCH_PUBSUB_START = 'TWITCH_PUBSUB_START',
  TWITCH_PUBSUB_STOP = 'TWITCH_PUBSUB_STOP',
  TWITCH_PUBSUB_EVENT = 'TWITCH_PUBSUB_EVENT',
}
