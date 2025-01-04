/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { setLogout } from "../redux/features/auth/authSlice";
import { addCartItem } from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Divider from "./Divider";

const UserMenu = ({ close }: { close: () => void }) => {
  const user = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout(user.token).unwrap();
      if (res.success) {
        close();
        toast.success("Logout successfully");
        dispatch(setLogout());
        dispatch(addCartItem([]));
        localStorage.clear();
        navigation("/");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.user?.name}
        </span>
        <Link
          to={`/${user?.user?.role.toLocaleLowerCase()}/dashboard`}
          className="hover:text-primary"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        <Link
          to={`/${user?.user?.role.toLocaleLowerCase()}/dashboard`}
          className="px-2 hover:bg-green-400 py-1 hover:text-black"
        >
          My Dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-green-400 py-1 hover:text-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
