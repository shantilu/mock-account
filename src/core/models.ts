export interface IAccount {
  id: string;
  type: string;
  user: string;
}

export const currencies = ["HKD", "CNY", "USD"];

export type currenciesType = typeof currencies;

export interface ITransaction {
  id: number;
  account_id: string;
  timestamp: string;
  amount: string;
  currency: "HKD" | "CNY" | "USD";
  type: "debit" | "credit";
  description: string;
}
