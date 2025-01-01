import banner from "../assets/images/banner (1).jpg";
import bannerMobile from "../assets/images/bann.avif";
const Banner = () => {
  return (
    <div className="container mx-auto">
      <div
        className={`w-full h-full min-h-48 bg-blue-100 rounded ${
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
      </div>
    </div>
  );
};

export default Banner;
