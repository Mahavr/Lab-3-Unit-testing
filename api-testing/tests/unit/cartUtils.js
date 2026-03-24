function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function addItem(cart, item) {
  const exists = cart.find((i) => i.id === item.id);
  if (exists) exists.quantity += 1;
  else cart.push({ ...item, quantity: 1 });
  return cart;
}

function removeItem(cart, id) {
  return cart.filter((i) => i.id !== id);
}

function updateQuantity(cart, id, quantity) {
  return cart.map((i) => (i.id === id ? { ...i, quantity } : i));
}

module.exports = {
  calculateTotal,
  formatPrice,
  addItem,
  removeItem,
  updateQuantity,
};
