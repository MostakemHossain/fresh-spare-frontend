import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
