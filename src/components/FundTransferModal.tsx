import React, { useState } from "react";
import { Modal, Input, InputNumber, Form, Select } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { currencies, currenciesType, IAccount } from "../core/models";
import { createTransaction } from "../providers/api";

export interface FundTransferDataType {
  fromAcc: string | null;
  toAcc: string | null;
  amount: number | 0;
  currency: currenciesType;
  description: string | null;
}

type FundTransferModalProps = {
  visible: boolean;
  setVisible: Function;
  accounts: IAccount[];
  displayAccount: string;
  loadCallback: Function;
  [other: string]: any;
};

export const FundTransferModal: React.FC<FundTransferModalProps> = ({
  visible,
  setVisible,
  accounts,
  displayAccount,
  loadCallback,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const [fromAccId, setFromAccID] = useState("");
  const [toAccID, setToAccID] = useState("");

  const handleOk = () => {
    const transData: FundTransferDataType = form.getFieldsValue();
    const { fromAcc, toAcc, amount, currency } = transData;

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to transfer ${currency} ${amount} from ${fromAcc} to ${toAcc}?`,
      okText: "confirm",
      cancelText: "cancel",
      onOk: () => {
        createTransaction(transData, displayAccount, loadCallback, () => {
          setVisible(false);
          form.resetFields();
        });
      },
    });
  };

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ currency: currencies[0] }}
        form={form}
      >
        <Form.Item
          name="fromAcc"
          label="From Account"
          rules={[
            { required: true, message: "Please select outbound account" },
          ]}
        >
          <Select
            value={fromAccId}
            onChange={(val: string) => setFromAccID(val)}
          >
            {accounts.map((account: any) => (
              <Select.Option value={account.id} key={account.id}>
                {account.type}-{account.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="To Account"
          name="toAcc"
          rules={[{ required: true, message: "Please select inbound account" }]}
        >
          <Select value={toAccID} onChange={(val: string) => setToAccID(val)}>
            {accounts.map((account: any) => (
              <Select.Option value={account.id} key={account.id}>
                {account.type}-{account.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="currency"
          label="currency"
          rules={[{ required: true, message: "Please select currency!" }]}
        >
          <Select style={{ width: 120 }}>
            {currencies.map((currency: string, index: number) => (
              <Select.Option value={currency} key={index}>
                {currency}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Please input amount!" }]}
          label="amount"
        >
          <InputNumber placeholder="amount" min={1} max={20000} step={100} />
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input placeholder="description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
