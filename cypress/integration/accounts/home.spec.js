/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("get table", () => {
    // https://on.cypress.io/url
    cy.get("table").get(".ant-table-column-sorter").click();
  });
});
