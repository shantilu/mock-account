import * as React from "react";
import { Table, Spin } from "antd";
import { ITransaction, currencies } from "../core/models";
import { numberFormatter, datetimeSorter } from "../providers/utils";
import { ColumnType } from "antd/lib/table";

type AccountTableProps = {
  transactions: ITransaction[];
  loading: boolean;
  [other: string]: any;
};

export const AccountTable = ({
  transactions,
  loading,
  ...restProps
}: AccountTableProps) => {
  const columns: ColumnType<ITransaction>[] = [
    {
      title: "Datetime",
      dataIndex: "timestamp",
      width: 200,
      sorter: (a: ITransaction, b: ITransaction) =>
        datetimeSorter(a.timestamp, b.timestamp),
      render: (text: string, record: ITransaction) =>
        record.timestamp && record.timestamp.replace("T", " ").split(".")[0],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: 100,
      sorter: (a: ITransaction, b: ITransaction) =>
        parseFloat(a.amount) - parseFloat(b.amount),
      render: (text: string, record: ITransaction) => (
        <span
          style={{
            textDecoration: record.type === "credit" ? "underline" : "none",
          }}
        >
          {numberFormatter(record.amount)}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "type",
      width: 100,
      filters: ["debit", "credit"].map((item: string) => {
        return {
          text: item,
          value: item,
        };
      }),
      onFilter: (value: any, record: ITransaction) =>
        record.type.indexOf(value) === 0,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      width: 100,
      filters: currencies.map((item: string) => {
        return {
          text: item,
          value: item,
        };
      }),
      onFilter: (value: any, record: ITransaction) =>
        record.currency.indexOf(value) === 0,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 100,
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        bordered
        columns={columns}
        dataSource={transactions}
        rowKey={(record: ITransaction) => record.id}
        {...restProps}
      />
    </Spin>
  );
};
