/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { setLogout } from "../../redux/features/auth/authSlice";
import { addCartItem } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [logout] = useLogoutMutation();
  const user = useAppSelector((state) => state?.auth);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await logout(user?.token).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Logout successfully");

        dispatch(setLogout());
        dispatch(addCartItem([]));
        localStorage.clear();

        window.location.reload();
        navigation("/");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const menu = (
    <Menu>
      {user && (
        <>
          <Menu.Item key="profile">
            <Link to={`/${user?.user?.role.toLowerCase()}/profile`}>
              My Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <div
            className="flex items-center justify-end"
            style={{ padding: "0 16px", marginTop: "10px" }}
          >
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src="https://example.com/your-avatar-image.jpg"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Header>
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
