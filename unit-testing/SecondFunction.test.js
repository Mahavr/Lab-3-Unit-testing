import * as util from './SecondFunction.js';

describe('multiply function', () => {
  test('multiplies two positive numbers', () => {
    expect(util.multiply(5, 3)).toBe(15);
  });

  test('multiplies a number by zero', () => {
    expect(util.multiply(5, 0)).toBe(0);
  });

  test('multiplies two negative numbers', () => {
    expect(util.multiply(-5, -3)).toBe(15);
  });

  test('multiplies a positive and a negative number', () => {
    expect(util.multiply(5, -3)).toBe(-15);
  });

  test('multiplies decimal numbers', () => {
    expect(util.multiply(5.5, 2.0)).toBe(11.0);
  });
});
