export interface Stock {
  id: string;
  stock: string;
  item: string;
  supplier: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStock {
  id: number;
  stock: string;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  modal: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoice_number: number;
  customer: string;
  invoice_date: Date;
  createdAt: Date;
  updatedAt: Date;
  invoiceItem?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
