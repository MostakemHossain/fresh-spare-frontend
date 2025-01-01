import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import useMobile from "../hooks/useMobile";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useGetCartItemQuery } from "../redux/features/cart/cartApi";
import { addCartItem } from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";
import DisplayCartItem from "./DisplayCartItem";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const { totalPrice, totalQty } = useGlobalContext();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useAppSelector((state) => state?.auth?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { data } = useGetCartItemQuery("");
  const dispatch = useAppDispatch();
  dispatch(addCartItem(data?.data));
  const cartItem = useAppSelector((state) => state.cart.cart);
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/auth");
  };
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user?.id) {
      navigate("/auth");
      return;
    }
    navigate("/user");
  };

  return (
    <div className="h-24 lg:h-22  bg-white z-40 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
      {!(isMobile && isSearchPage) && (
        <div className="container flex mx-auto items-center px-3 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full">
              <img
                className="rounded-[50%] hidden lg:block"
                src={logo}
                width={95}
                height={95}
                alt="logo"
              />
              <img
                className="rounded-[50%] lg:hidden"
                src={logo}
                width={60}
                height={60}
                alt="logo"
              />
            </Link>
          </div>
          {/* search  */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login  */}
          <div className="">
            {/* mobile  */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser onClick={handleMobileUser} size={30} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              {user?.id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p>Dashboard</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 cursor-pointer"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white"
              >
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm">
                  {cartItem && cartItem[0] ? (
                    <div>
                      {" "}
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInDollar(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </div>
  );
};

export default Header;
