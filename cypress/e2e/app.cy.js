describe("AmountInput Component", () => {
  beforeEach(() => {
    cy.visit("/currency-converter/src/components/InputAmount.tsx");
  });

  it("updates value when typing", () => {
    cy.get('input[placeholder="0.00"]').should("have.value", "");

    cy.get('input[placeholder="0.00"]').type("10.50");

    cy.get('input[placeholder="0.00"]').should("have.value", "10.50");
  });

  it("handles decimal input correctly", () => {
    cy.get('input[placeholder="0.00"]').type("10.50");
    cy.get('input[placeholder="0.00"]').should("have.value", "10.50");

    cy.get('input[placeholder="0.00"]').clear().type("100");
    cy.get('input[placeholder="0.00"]').should("have.value", "100");
  });
});
