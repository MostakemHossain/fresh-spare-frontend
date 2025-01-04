import { Link } from "react-router-dom";
import bannerMobile from "../assets/images/bann.avif";
import banner from "../assets/images/banner (1).jpg";
const Banner = () => {
  return (
    <div className="container mx-auto">
      <Link
        to={"/search"}
        className={`w-full h-full min-h-48 rounded ${
          !banner && "animate-pulse my-2"
        } `}
      >
        <img
          src={banner}
          className="w-full h-full hidden lg:block"
          alt="banner"
        />
        <img
          src={bannerMobile}
          className="w-full h-full lg:hidden"
          alt="banner"
        />
      </Link>
    </div>
  );
};

export default Banner;
