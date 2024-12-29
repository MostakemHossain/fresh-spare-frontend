/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };
  return (
    <div className="bg-white h-full w-full py-2">
        <button onClick={()=>window.history.back()} className="text-neutral-800 block w-fit ml-auto mr-4 py-2">
            <IoClose size={25}/>
        </button>
      <div className="container mx-auto px-3 pb-8">
        <UserMenu close={handleCloseUserMenu} />
      </div>
    </div>
  );
};

export default UserMenuMobile;