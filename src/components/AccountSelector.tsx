import { Form, Select } from "antd";
import React from "react";
import { IAccount } from "../core/models";
import { loadTransactions } from "../providers/api";

type AccountSelectorProps = {
  accounts: IAccount[];
  displayAccount: string | null;
  loadCallback: Function;
  setLoading: Function;
};

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  accounts,
  displayAccount,
  loadCallback,
  setLoading,
}) => {
  return (
    <>
      <Form>
        <Form.Item label="Account">
          <Select
            value={displayAccount || ""}
            onChange={(account: string) =>
              loadTransactions(account, setLoading, loadCallback)
            }
          >
            {accounts.map((account: any) => (
              <Select.Option value={account.id} key={account.id}>
                {account.type}-{account.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
