/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const rederectToSearchPage = () => {
    navigate("/search");
  };

  const hanadleOnChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };
  return (
    <div className="w-full min-w-[300px] group lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 focus-within:border-primary">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="flex cursor-pointer justify-center group-focus-within:text-primary items-center h-full p-3 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={22} />
          </Link>
        ) : (
          <button className="flex justify-center group-focus-within:text-primary items-center h-full p-3">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={rederectToSearchPage}
            className="h-full w-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "Milk"',
                1000,
                'Search "Bread"',
                1000,
                'Search "Sugar"',
                1000,
                'Search "Rice"',
                1000,
                'Search "Eggs"',
                1000,
                'Search "Vegetables"',
                1000,
                'Search "Fruits"',
                1000,
                'Search "Cooking Oil"',
                1000,
                'Search "Tea"',
                1000,
                'Search "Coffee"',
                1000,
                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{
                fontSize: "1em",
                display: "inline-block",
                marginLeft: "10px",
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              className="w-full bg-transparent h-full px-2 outline-none"
              type="text"
              autoFocus={true}
              placeholder="Search your daily necessary"
              onChange={hanadleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
