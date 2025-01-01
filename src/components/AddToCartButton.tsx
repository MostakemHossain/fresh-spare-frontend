/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { useAppSelector } from "../redux/hooks";
import Loading from "./Loading";

interface ProductData {
  _id: string;
  // Add other fields as needed
}

interface CartItem {
  productId: ProductData;
  _id: string;
  quantity: number;
}

interface AddToCartButtonProps {
  data: ProductData;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ data }) => {
  const { updateCartItemQty, deleteCartItemQty } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const cartItem = useAppSelector((state) => state.cart.cart as CartItem[]);
  const [isAvailableCart, setIsAvailableCart] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const [cartItemDetails, setCartItemsDetails] = useState<
    CartItem | undefined
  >();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      if (data) {
        const res = await addToCart({ data: data?._id }).unwrap();
        if (res.success) {
          toast.success("Product added to cart successfully");
        }
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItem) {
      const checkingItem = cartItem?.some(
        (item) => item?.productId?._id === data?._id
      );
      setIsAvailableCart(checkingItem);
    }

    if (cartItem) {
      const product = cartItem?.find(
        (item) => item?.productId?._id === data?._id
      );
      setQty(product?.quantity || 0);
      setCartItemsDetails(product);
    }
  }, [data, cartItem]);

  const increaseQty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;
    const response = await updateCartItemQty(cartItemDetails._id, qty + 1);
    //@ts-ignore
    if (response.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;
    if (qty === 1) {
      deleteCartItemQty(cartItemDetails._id);
    } else {
      const response = await updateCartItemQty(cartItemDetails._id, qty - 1);
      //@ts-ignore
      if (response?.success) {
        toast.success("Item removed");
      }
    }
  };

  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
