/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { setLogout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Divider from "./Divider";

const UserMenu = ({ close }: { close: () => void }) => {
  const user = useAppSelector((state) => state?.auth);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout(user.token).unwrap();
      if (res.success) {
        close();
        toast.success("Logout successfully");
        dispatch(setLogout());
        navigation("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user?.user?.name}</div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link to={"/"} className="px-2 hover:bg-orange-200 py-1">
          My Orders
        </Link>
        <Link to={"/"} className="px-2 hover:bg-orange-200 py-1">
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;