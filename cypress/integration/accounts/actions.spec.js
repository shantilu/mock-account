/// <reference types="cypress" />

context("Actions", () => {
  it("click account selector", () => {
    cy.visit("http://localhost:3000/");

    cy.get("div.ant-form-item-control-input")
      .get("span.ant-select-selection-item")
      .should("contain", "savings")
      .click();
    cy.get("div.rc-virtual-list-holder-inner")
      .find("div.ant-select-item.ant-select-item-option")
      .should("have.length", 2);
    cy.get(
      "div.ant-select-item.ant-select-item-option[aria-selected='false']"
    ).click();
  });

  it("button", () => {
    const rows = cy
      .get(".ant-table-content table tbody.ant-table-tbody tr")
      .its("length");

    cy.get(".ant-modal-wrap").should("not.exist");
    cy.get("button.ant-btn.ant-btn-primary").click();
    cy.get(".ant-modal-wrap").should("exist");

    cy.get("input#fromAcc").click();
    cy.get("#fromAcc_list").should("exist");

    const accountsCount = 2;
    const amount = 100;
    const description = "transfer money 100";
    const date = new Date().toISOString().split("T")[0];

    cy.get("#fromAcc_list")
      .should("exist")
      .parent()
      .find("div.ant-select-item.ant-select-item-option")
      .should("have.length", accountsCount)
      .first()
      .click();

    cy.get("input#toAcc").click();
    cy.get("#toAcc_list")
      .should("exist")
      .parent()
      .find("div.ant-select-item.ant-select-item-option")
      .should("have.length", accountsCount)
      .last()
      .click();

    cy.get("input#amount").type(amount).should("have.value", amount);

    cy.get("input#description")
      .type(description)
      .should("have.value", description);

    cy.get(".ant-modal-wrap button.ant-btn.ant-btn-primary")
      .click()
      .get(".ant-modal-confirm-body-wrapper")
      .should("exist")
      .find(".ant-modal-confirm-btns button.ant-btn.ant-btn-primary")
      .should("exist")
      .click()
      .then(() =>
        cy
          .get(".ant-table-content table tbody.ant-table-tbody tr")
          .last()
          .find("td")
          .first()
          .should("contain", date)
      );
  });
});
