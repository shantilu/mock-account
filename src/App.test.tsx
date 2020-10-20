import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { AccountSelector } from "./components/AccountSelector";
import { AccountTable } from "./components/AccountTable";
import { FundTransferModal } from "./components/FundTransferModal";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
