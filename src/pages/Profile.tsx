import { Flex, Spin } from "antd";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarUpload from "../components/UserProfileAvatarUpload";
import { useGetMyInfoQuery } from "../redux/features/user/userApi";

const Profile = () => {
  const { data, isLoading } = useGetMyInfoQuery("");
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <div>
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {data?.data?.avatar ? (
          <img alt={data?.data?.name} src={data?.data?.avatar} />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-xs min-w-20 border-primary hover:border-primary-light border px-3 py-1 rounded-full mt-3 hover:bg-primary"
      >
        Change Photo
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarUpload
          close={() => setOpenProfileAvatarEdit(false)}
        />
      )}
    </div>
  );
};

export default Profile;
