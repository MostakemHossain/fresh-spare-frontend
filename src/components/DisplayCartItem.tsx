import toast from "react-hot-toast";
import { FaCaretRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import imageEmpty from "../assets/images/empty.avif";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useAppSelector } from "../redux/hooks";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

// Define the type for cart item
type CartItem = {
  _id: string;
  productId: {
    _id: string;
    image: string[];
    name: string;
    unit: string;
    price: number;
    discount?: number;
  };
};

// Define the props type
type DisplayCartItemProps = {
  close?: () => void;
};

const DisplayCartItem: React.FC<DisplayCartItemProps> = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useAppSelector((state) => state.cart.cart) as CartItem[];
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?.id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast.error("Please Login");
  };

  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/***display items */}
          {cartItem.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInDollar(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem.map((item) => (
                  <div
                    key={item._id + "cartItemDisplay"}
                    className="flex  w-full gap-4"
                  >
                    <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                      <img
                        src={item.productId.image[0]}
                        className="object-scale-down"
                        alt={item.productId.name}
                      />
                    </div>
                    <div className="w-full max-w-sm text-xs">
                      <p className="text-xs text-ellipsis line-clamp-2">
                        {item.productId.name}
                      </p>
                      <p className="text-neutral-400">{item.productId.unit}</p>
                      <p className="font-semibold">
                        {DisplayPriceInDollar(
                          pricewithDiscount(
                            item.productId.price,
                            item.productId.discount
                          )
                        )}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item.productId} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInDollar(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInDollar(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  <p className="flex items-center gap-2">{totalQty} item(s)</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>{DisplayPriceInDollar(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={imageEmpty}
                className="w-full h-full object-scale-down"
                alt="Empty cart"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem.length > 0 && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInDollar(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
