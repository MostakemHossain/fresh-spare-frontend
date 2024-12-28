import React from "react";
import Footer from "../Footer";
import Header from "../Header";

const MinimalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MinimalLayout;
