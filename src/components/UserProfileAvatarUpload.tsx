/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { useUploadAvatarMutation } from "../redux/features/user/userApi";

const UserProfileAvatarUpload = ({ close }: { close: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile);

    try {
      const res = await uploadAvatar(formData).unwrap();
      console.log(res);
      toast.success("Avatar updated successfully!");
      close();
    } catch (error: any) {
      toast.error("Failed to upload avatar. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold text-center mb-4">
          Upload Avatar
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mb-4 bg-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={65} className="text-gray-500" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-primary rounded-full hover:bg-primary-light disabled:opacity-50"
            >
              {uploading ? <Spin size="small" /> : "Upload"}
            </button>
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAvatarUpload;
