describe("Login UI Test", () => {
  it("Login with valid credentials", () => {
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.contains("Products").should("be.visible");
  });
});
