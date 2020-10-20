/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("button", () => {
    cy.get("button.ant-btn.ant-btn-primary").click();
  });
});
