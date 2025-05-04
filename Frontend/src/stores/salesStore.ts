import { Category, OrderDetail, Product } from "@customTypes/types";
import { create } from "zustand";

type SalesStore = {
  selectedCategory: Category | null;
  cart: OrderDetail[];
  total: number;
  searchText: string;

  setSelectedCategory: (category: Category) => void;
  setTotal: (total: number) => void;
  setSearchText: (searchText: string) => void;
  addToCart: (item: Product) => void;
  sumQuantityToItem: (id: number, quantity: number) => void;
  deleteFromCart: () => void;
};

export const useSales = create<SalesStore>((set) => ({
  selectedCategory: null,
  cart: [],
  total: 0,
  searchText: "",

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setTotal: (total) => set({ total: total }),
  setSearchText: (searchText) => set({ searchText: searchText }),

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.product === item.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.product === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1, sub_total: item.unit_price * (cartItem.quantity + 1)}
              : cartItem
          ),
          total: state.total + item.unit_price,
        };
      } else {
        return {
          cart: [
            ...state.cart,
            {
              id: null,
              order: null,
              product: item.id,
              quantity: 1,
              sub_total: item.unit_price,
            },
          ],
          total: state.total + item.unit_price,
        };
      }
    });
  },
  sumQuantityToItem: (id, quantity) => {
    set((state) => {
      const cartItem = state.cart.find((item) => item.product === id);

      if (cartItem) {
        const price = cartItem?.sub_total / cartItem?.quantity;

        return {
          cart: state.cart
            .map((item) =>
              item.product === id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    sub_total: (item.quantity + quantity)* price,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
            total: state.total + quantity * price
        };
      }
      else{
        return {
            cart: state.cart
        }
      }
    });
  },

  deleteFromCart: () => {
    set(() => ({
      cart: [],
      total: 0,
    }));
  },
}));
