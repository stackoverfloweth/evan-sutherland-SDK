import { asArray } from '@/utilities/array'

describe('asArray', () => {
  test('should return single value if given single value', () => {
  // arrange
    const value = 1

    // act
    const response = asArray(value)

    // assert
    expect(response).toEqual(expect.arrayContaining([value]))
  })

  test('should return same value if given array value', () => {
    // arrange
    const value = [1, 2, 3]

    // act
    const response = asArray(value)

    // assert
    expect(response).toEqual(value)
  })
})