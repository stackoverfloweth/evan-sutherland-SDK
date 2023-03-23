import { FailureResponse } from '@/types/failureResponse'

export class ApiFailureError extends Error {
  public constructor(error: FailureResponse) {
    super(error.message)
  }
}