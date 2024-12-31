/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteCartItemMutation,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
} from "../redux/features/cart/cartApi";
import { addCartItem } from "../redux/features/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

// Define the type for individual cart items
interface CartItem {
  productId: {
    price: number;
    discount?: number;
  };
  quantity: number;
}

interface GlobalContextType {
  cartItem: CartItem[];
  totalPrice: number;
  totalQty: number;
  notDiscountTotalPrice: number;
  updateCartItemQty: (id: string, qty: number) => Promise<void>;
  deleteCartItemQty: (cartId: string) => Promise<void>;
}

const defaultContextValue: GlobalContextType = {
  cartItem: [],
  totalPrice: 0,
  totalQty: 0,
  notDiscountTotalPrice: 0,
  updateCartItemQty: async () => {},
  deleteCartItemQty: async () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(defaultContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const { data: cartItem } = useGetCartItemQuery("");

  useEffect(() => {
    if (cartItem?.data) {
      dispatch(addCartItem(cartItem.data));
    }
  }, [cartItem, dispatch]);

  useEffect(() => {
    if (cartItem?.data) {
      // Calculate total quantity
      const qty = cartItem.data.reduce((prev: any, curr: { quantity: any; }) => prev + curr.quantity, 0);
      setTotalQty(qty);

      // Calculate total price with discount
      const tPrice = cartItem.data.reduce((prev: number, curr: { productId: { price: any; discount: number | undefined; }; quantity: number; }) => {
        const priceAfterDiscount = pricewithDiscount(
          curr.productId.price,
          curr.productId.discount
        );
        return prev + priceAfterDiscount * curr.quantity;
      }, 0);
      setTotalPrice(tPrice);

      // Calculate total price without discount
      const notDiscountPrice = cartItem.data.reduce(
        (prev: number, curr: { productId: { price: number; }; quantity: number; }) => prev + curr.productId.price * curr.quantity,
        0
      );
      setNotDiscountTotalPrice(notDiscountPrice);
    }
  }, [cartItem]);

  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const updateCartItemQty = async (id: string, qty: number): Promise<void> => {
    try {
      const responseData = await updateCartItem({ id, quantity: qty }).unwrap();
      if (responseData.success) {
        toast.success("Updated cart item");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const deleteCartItemQty = async (cartId: string): Promise<void> => {
    try {
      const responseData = await deleteCartItem({ data: cartId }).unwrap();
      if (responseData.success) {
        toast.success("Item deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cartItem: cartItem?.data || [],
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        updateCartItemQty,
        deleteCartItemQty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
