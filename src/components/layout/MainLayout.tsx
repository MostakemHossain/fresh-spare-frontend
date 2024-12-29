import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout >
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Fresh Spare ©{new Date().getFullYear()} Created by Mostakem
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
