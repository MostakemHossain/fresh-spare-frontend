import { Outlet, useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopByCategory from "../components/ShopByCategory";
import CartMobileLink from "../components/CartMobileLink";


const Home = () => {
  const location = useLocation()
  return (
    <div>
      <Header />
      <Banner />
      <ShopByCategory />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      {location.pathname !== "/checkout" && <CartMobileLink />}
    </div>
  );
};

export default Home;
