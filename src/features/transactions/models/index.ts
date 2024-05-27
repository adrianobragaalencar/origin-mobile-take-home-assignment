export interface Transaction {
  Id: number;
  Amount: number;
  Date: string;
  Vendor: string;
  Type: string;
  Category: string;
  Lat: number;
  Lon: number;
  ReceiptImage: string | null;
}

export interface Transactions {
  Page: number;
  PageSize: number;
  TotalRecords: number;
  TotalPages: number;
  Transactions: Transaction[];
}

export const getTransactionDate = (transaction: Transaction) => {
  const date = new Date(transaction.Date);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}
