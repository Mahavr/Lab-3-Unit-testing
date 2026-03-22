import * as util from './ThirdFunction.js';

describe('divide function', () => {
  test('divides two positive numbers', () => {
    expect(util.divide(10, 2)).toBe(5);
  });

  test('divides a number by one', () => {
    expect(util.divide(10, 1)).toBe(10);
  });

  test('divides two negative numbers', () => {
    expect(util.divide(-10, -2)).toBe(5);
  });

  test('divides a positive by a negative number', () => {
    expect(util.divide(10, -2)).toBe(-5);
  });

  test('divides decimal numbers', () => {
    expect(util.divide(5.5, 2.0)).toBeCloseTo(2.75);
  });
});
