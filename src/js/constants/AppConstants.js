export const WebServer = {
  DOMAIN: location.origin,
}
export const VersionInfo = {
  version: 2,
  build: 1,
}

export const DEFAULT_ENV = 'BETA';
export const Hosts = {
  PROD: {
    PUBLIC: 'https://api.sliver.tv/v1',
  },
  BETA: {
    PUBLIC: 'https://beta-api.sliver.tv/v1',
  },
}
export const Paths = {
  HOME: "/",
}
export const RequestState = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}
export const Modals = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup',
  FORGOT: 'forgot',
  SHARE: 'share',
}

