/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("get table", () => {
    // https://on.cypress.io/url
    cy.get(".ant-table-content table tbody.ant-table-tbody tr").should(
      "have.length",
      9
    );
  });
});
