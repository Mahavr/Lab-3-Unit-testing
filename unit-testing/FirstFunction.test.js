import * as util from './FirstFunction.js';

describe('subtract function', () => {
  test('subtracts two positive numbers', () => {
    expect(util.subtract(5, 3)).toBe(2);
  });

  test('subtracts a positive and a negative number', () => {
    expect(util.subtract(5, -3)).toBe(8);
  });

  test('subtracts zero', () => {
    expect(util.subtract(5, 0)).toBe(5);
  });

  test('subtracts two negative numbers', () => {
    expect(util.subtract(-5, -3)).toBe(-2);
  });

  test('subtracts decimal numbers', () => {
    expect(util.subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});