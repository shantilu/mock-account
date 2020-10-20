/// <reference types="cypress" />

context("Location", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("cy.url() - get the current URL", () => {
    // https://on.cypress.io/url
    cy.url().should("eq", "http://localhost:3000/");
    cy.hash().should("be.empty");
  });

  it("cy.title() - get the current page title", () => {
    cy.title().should("contain", "Showing account details of ");
  });
});
