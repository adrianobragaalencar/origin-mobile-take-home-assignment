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
