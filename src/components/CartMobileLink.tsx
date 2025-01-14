import { FaCaretRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useAppSelector } from "../redux/hooks";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useAppSelector((state) => state.cart.cart);

  return (
    <>
      {cartItem && cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceInDollar(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/checkout"} className="flex items-center gap-1">
              <span className="text-sm">Check Out</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
