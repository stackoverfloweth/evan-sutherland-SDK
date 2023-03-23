export class InvalidApiOptionsError extends Error {
  public constructor() {
    super('Invalid ApiOptions! This data cannot be accessed without providing an api key')
  }
}