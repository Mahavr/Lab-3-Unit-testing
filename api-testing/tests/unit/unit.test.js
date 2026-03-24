const {
  calculateTotal,
  formatPrice,
  addItem,
  removeItem,
  updateQuantity,
} = require("./cartUtils");

describe("Cart Utilities", () => {
  test("calculateTotal returns correct sum", () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  test("formatPrice returns formatted string", () => {
    expect(formatPrice(10)).toBe("$10.00");
    expect(formatPrice(10.5)).toBe("$10.50");
  });

  test("addItem adds new item or increments quantity", () => {
    let cart = [];
    cart = addItem(cart, { id: 1, price: 5 });
    expect(cart[0].quantity).toBe(1);
    cart = addItem(cart, { id: 1, price: 5 });
    expect(cart[0].quantity).toBe(2);
  });

  test("removeItem removes correct item", () => {
    let cart = [
      { id: 1, price: 5, quantity: 2 },
      { id: 2, price: 10, quantity: 1 },
    ];
    cart = removeItem(cart, 1);
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(2);
  });

  test("updateQuantity updates item quantity", () => {
    let cart = [{ id: 1, price: 5, quantity: 2 }];
    cart = updateQuantity(cart, 1, 5);
    expect(cart[0].quantity).toBe(5);
  });
});
