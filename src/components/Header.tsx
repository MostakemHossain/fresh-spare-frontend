import { BsCart4 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import useMobile from "../hooks/useMobile";
import Search from "./Search";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/auth");
  };

  return (
    <div className="h-24 lg:h-22 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
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
              <FaRegCircleUser size={30} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              <button
                onClick={redirectToLoginPage}
                className="text-lg px-2 cursor-pointer"
              >
                Login
              </button>
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </div>
  );
};

export default Header;
