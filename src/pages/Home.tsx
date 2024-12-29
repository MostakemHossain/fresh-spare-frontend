import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
