import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopByCategory from "../components/ShopByCategory";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <ShopByCategory />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
