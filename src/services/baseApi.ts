import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { variables, isDefined } from '@/utilities'

export type BaseApiConfig = CreateAxiosDefaults

export type AuthenticatedApiConfig = BaseApiConfig & {
  apiKey: string,
}

export class BaseApi<T extends BaseApiConfig | AuthenticatedApiConfig = BaseApiConfig> {
  protected readonly apiConfig: T
  protected routePrefix: string | undefined

  public constructor(apiConfig: T, routePrefix?: string) {
    this.apiConfig = apiConfig
    this.routePrefix = routePrefix
  }

  protected get instance(): AxiosInstance {
    return axios.create({
      ...this.apiConfig,
      baseURL: this.composeBaseUrl(),
      headers: this.composeHeaders(),
    })
  }

  protected get authorizationHeader(): { Authorization?: string } {
    if (isAuthenticatedApiConfig(this.apiConfig)) {
      return {
        Authorization: `bearer ${this.apiConfig.apiKey}`,
      }
    }

    return {}
  }

  protected composeBaseUrl(): string {
    const repeatingSlashes = /(\/+)/g

    return [
      this.apiConfig.baseURL ?? variables.baseUrl,
      this.routePrefix,
    ]
      .filter(isDefined)
      .join('/')
      .replace(repeatingSlashes, '/')
  }

  protected composeHeaders(): BaseApiConfig['headers'] {
    return {
      ...this.authorizationHeader,
      ...this.apiConfig.headers,
    }
  }
}

function isAuthenticatedApiConfig(config: BaseApiConfig | AuthenticatedApiConfig): config is AuthenticatedApiConfig {
  return !!config.baseURL
}
