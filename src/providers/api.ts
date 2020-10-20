import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { FundTransferDataType } from "../components/FundTransferModal";
import { message } from "antd";

const FetchAPI = (
  method: "get" | "post" | "put" | "patch",
  resource: string,
  query_params: any,
  data: any
) => {
  const url: string = "http://localhost:4000/" + resource;
  return axios(url, { method, data });
};

const handleError = (err: AxiosError) =>
  message.error(err.code || "" + " Encountered some network error ");

export const loadTransactions = (
  account_id: string,
  setLoading: Function | null,
  callback: Function
) => {
  setLoading && setLoading(true);
  axios
    .get("http://localhost:4000/transactions", {
      params: { account_id },
    })
    .then((res: AxiosResponse) => callback(account_id, res.data))
    .catch(handleError);
};

export const createTransaction = async (
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
  try {
    const creditRes: AxiosResponse = await axios.post(
      "http://localhost:4000/transactions",
      creditTransaction
    );
    const debitRes: AxiosResponse = await axios.post(
      "http://localhost:4000/transactions",
      debitTransaction
    );
    if (creditRes && debitRes) {
      loadTransactions(displayAccount, null, loadCallback);
      callback();
    }
  } catch (err) {
    // Handle Error Here
    message.error(err);
  }
};

export const loadAccounts = (user: string) => {
  return axios
    .get("http://localhost:4000/accounts", {
      params: { user },
    })
    .then((res: AxiosResponse) => res.data)
    .catch(handleError);
};
