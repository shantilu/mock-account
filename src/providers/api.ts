import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

import { HttpClient } from "./rest-client-interceptor";
import { FundTransferDataType } from "../components/FundTransferModal";
import { message } from "antd";
import { ITransaction, IAccount } from "../core/models";

class MainApi extends HttpClient {
  public constructor() {
    super("http://localhost:4000");
  }

  public getTransactions = (params: any) =>
    this.instance.get("/transactions", { params });

  public createTransaction = (body: any) =>
    this.instance.post("/transactions", body);

  public getAccounts = (params: any) =>
    this.instance.get("/accounts", { params });
}

const handleError = (err: AxiosError) =>
  message.error(err.code || "" + " Encountered some network error ");

const baseApi = new MainApi();

export const loadTransactions = (
  account_id: string,
  setLoading: Function | null,
  callback: Function
) => {
  setLoading && setLoading(true);
  baseApi
    .getTransactions({ account_id })
    .then((data: any) => callback(account_id, data))
    .catch(handleError);
};

export const createTransaction = (
  data: FundTransferDataType,
  displayAccount: string,
  loadCallback: Function,
  callback: Function
) => {
  const { fromAcc, toAcc, amount, currency, description } = data;
  const timestamp = new Date().toISOString();
  const transaction = { amount, currency, description, timestamp };
  const creditTransaction = {
    account_id: fromAcc,
    type: "credit",
    ...transaction,
  };
  const debitTransaction = {
    account_id: toAcc,
    type: "debit",
    ...transaction,
  };

  // const debitRes: AxiosResponse = await axios.post(
  //   "http://localhost:4000/transactions",
  //   debitTransaction
  // );
  baseApi.createTransaction(creditTransaction).then((creRes: any) =>
    baseApi.createTransaction(debitTransaction).then((debRes: any) => {
      loadTransactions(displayAccount, null, loadCallback);
      callback();
    })
  );
};

export const loadAccounts = (
  user: string,
  setAccounts: Function,
  loadCallback: Function
) => {
  baseApi.getAccounts({ user }).then((data: any) => {
    setAccounts(data);
    if (data.length) {
      const defaultAccount = data[0];
      loadTransactions(defaultAccount.id, null, loadCallback);
    }
  });
};
