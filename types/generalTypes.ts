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