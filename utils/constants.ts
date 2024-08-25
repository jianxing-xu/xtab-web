export enum Path {
  Home = '/',
  Chat = '/chat',
  Settings = '/settings',
  NewChat = '/new-chat',
  Masks = '/masks',
  Auth = '/auth',
  Sd = '/sd',
  SdNew = '/sd-new',
  Artifacts = '/artifacts',
}
export enum StoreKey {
  Chat = 'chat-next-web-store',
  Access = 'access-control',
  Config = 'app-config',
  Mask = 'mask-store',
  Prompt = 'prompt-store',
  Update = 'chat-update',
  Sync = 'sync',
  SdList = 'sd-list',
}
export enum SubmitKey {
  Enter = 'Enter',
  CtrlEnter = 'Ctrl + Enter',
  ShiftEnter = 'Shift + Enter',
  AltEnter = 'Alt + Enter',
  MetaEnter = 'Meta + Enter',
}

export const DEFAULT_SIDEBAR_WIDTH = 300
export const MAX_SIDEBAR_WIDTH = 500
export const MIN_SIDEBAR_WIDTH = 230
export const NARROW_SIDEBAR_WIDTH = 100
