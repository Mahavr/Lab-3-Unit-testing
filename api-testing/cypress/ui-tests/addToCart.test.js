describe("Add Product to Cart", () => {
  it("Add first product to cart", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".inventory_item").first().contains("Add to cart").click();
    cy.get(".shopping_cart_badge").should("contain", "1");
  });
});
