import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

export type BaseApiConfig = CreateAxiosDefaults & {
  apiKey?: string,
}

export class BaseApi<T extends BaseApiConfig = BaseApiConfig> {
  protected readonly apiConfig: T
  protected routePrefix: string | undefined

  public constructor(apiConfig: T, routePrefix?: string) {
    this.apiConfig = apiConfig
    this.routePrefix = routePrefix
  }

  protected get instance(): AxiosInstance {
    return axios.create({
      ...this.apiConfig,
      headers: this.composeHeaders(),
    })
  }

  protected get authorizationHeader(): { Authorization?: string } {
    if (this.apiConfig.apiKey) {
      return {
        Authorization: `bearer ${this.apiConfig.apiKey}`,
      }
    }

    return {}
  }

  protected composeHeaders(): BaseApiConfig['headers'] {
    return {
      ...this.authorizationHeader,
      ...this.apiConfig.headers,
    }
  }
}

