import React, { useEffect, useState } from "react";
// import "./App.css";

import { AccountTable } from "./components/AccountTable";
import { AccountSelector } from "./components/AccountSelector";
import { FundTransferModal } from "./components/FundTransferModal";
import { Layout, Row, Col, Button, Menu } from "antd";
import { ITransaction, IAccount } from "./core/models";
import { loadTransactions, loadAccounts } from "./providers/api";

const { Header, Content, Footer } = Layout;

function App() {
  const user: string = "john_doe";
  const [accounts, setAccounts]: [IAccount[], Function] = useState([]);
  const [displayAccount, setDisplayAccount]: [string | null, any] = useState(
    null
  );
  const [transactions, setTransactions]: [ITransaction[], Function] = useState(
    []
  );
  const [loading, setLoading]: [boolean, Function] = useState(false);
  const [showModal, setShowModal]: [boolean, any] = useState(false);

  const loadCallback = (account: string, transactionData: ITransaction[]) => {
    setDisplayAccount(account);
    setTransactions(transactionData);
    setLoading(false);
    document.title = "Showing account details of " + account;
  };

  useEffect(() => {
    setLoading(true);
    loadAccounts(user, setAccounts, loadCallback);
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <div className="App">
          <Row gutter={16}>
            <Col span={8}>
              <AccountSelector
                accounts={accounts}
                displayAccount={displayAccount}
                loadCallback={loadCallback}
                setLoading={setLoading}
              />
            </Col>

            <Col span={4} offset={12}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e: any) => setShowModal(true)}
              >
                Transfer Fund
              </Button>
            </Col>
          </Row>

          <AccountTable transactions={transactions} loading={loading} />

          <FundTransferModal
            visible={showModal}
            setVisible={setShowModal}
            accounts={accounts}
            displayAccount={displayAccount || ""}
            loadCallback={loadCallback}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2020 Created by Shanti</Footer>
    </Layout>
  );
}

export default App;
