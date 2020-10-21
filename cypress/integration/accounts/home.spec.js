/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("get table", () => {
    // https://on.cypress.io/url
    cy.get("table")
      .find("tbody.ant-table-tbody")
      .find("tr")
      .should("have.length", 9);
  });

  it("click account selector", () => {
    // https://on.cypress.io/url

    cy.get("div.ant-form-item-control-input")
      .get("span.ant-select-selection-item")
      .should("contain", "savings")
      .click();
    cy.get("div.rc-virtual-list-holder-inner")
      .find("div.ant-select-item.ant-select-item-option")
      .should("have.length", 2);
    cy.get(
      "div.ant-select-item.ant-select-item-option.ant-select-item-option-active"
    ).click();
  });
});
