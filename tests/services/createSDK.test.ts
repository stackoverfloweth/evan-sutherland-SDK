import { createSDK } from '@/services/createSDK'

jest.mock('@/utilities/variables', () => jest.fn())

describe('createSDK', () => {
  test('given no config, returns only base apis', () => {
    // arrange

    // act
    const response = createSDK()

    // assert
    expect(response).toHaveProperty('books')
    expect(response).not.toHaveProperty('characters')
    expect(response).not.toHaveProperty('movies')
    expect(response).not.toHaveProperty('quotes')
  })

  test('given apiKey in config, returns full authenticated apis', () => {
    // arrange
    const config = {
      apiKey: '123',
    }

    // act
    const response = createSDK(config)

    // assert
    expect(response).toHaveProperty('books')
    expect(response).toHaveProperty('characters')
    expect(response).toHaveProperty('movies')
    expect(response).toHaveProperty('quotes')
  })
})