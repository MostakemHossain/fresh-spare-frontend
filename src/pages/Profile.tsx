/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarUpload from "../components/UserProfileAvatarUpload";
import {
  useGetMyInfoQuery,
  useUpdateUserInformationMutation,
} from "../redux/features/user/userApi";

const Profile = () => {
  const { data, isLoading } = useGetMyInfoQuery("");
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
    },
  });
  const [updateUserInformation] = useUpdateUserInformationMutation();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name || "",
        mobile: data.data.mobile || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: { name: string; mobile: string }) => {
    setIsSubmitting(true);
    try {
      const res = await updateUserInformation(formData).unwrap();
      if (res.success) {
        toast.success("User information updated successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4 min-w-52"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={data?.data?.email || ""}
              readOnly
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm"
            />
            {/* Disabled Icon */}
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm4-10H8a1 1 0 000 2h8a1 1 0 000-2z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            {...register("mobile", { required: "Mobile is required" })}
            placeholder="Enter your mobile number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm">
              {errors.mobile.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded-md  ${
            isSubmitting
              ? "bg-primary-light cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Flex align="center" gap="middle">
                <Spin size="small" />
              </Flex>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
