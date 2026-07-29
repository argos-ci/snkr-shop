import products from '@/assets/data.json';

export type Sneakers = (typeof products)[0];

export type CartItem = {
  id: number;
};

export type CartState = {
  items: CartItem[];
  empty: boolean;
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  checkout: () => void;
};
