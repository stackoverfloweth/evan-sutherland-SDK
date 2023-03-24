import { isDefined } from '@/utilities/optional'

describe('isDefined', () => {
  test.each([1, 'one', '', null, Number])('returns true if value anything but undefined', (input: unknown) => {
    // arrange

    // act
    const response = isDefined(input)

    // assert
    expect(response).toBeTruthy()
  })

  test('returns false if value is undefined', () => {
    // arrange
    const input = undefined

    // act
    const response = isDefined(input)

    // assert
    expect(response).toBeFalsy()
  })
})