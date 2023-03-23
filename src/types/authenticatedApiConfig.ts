import { BaseApiConfig } from '@/services'

export type AuthenticatedApiConfig = BaseApiConfig & {
  apiKey: string,
}

export function isAuthenticatedApiConfig(config: BaseApiConfig | AuthenticatedApiConfig): config is AuthenticatedApiConfig {
  return 'apiKey' in config
}