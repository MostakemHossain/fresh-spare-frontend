/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Select, Spin } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaEye, FaTrash } from "react-icons/fa";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";
import {
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../redux/features/product/productApi";
import { useGetAllSubCategoryQuery } from "../../redux/features/subCategory/subCategoryApi";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}
interface ProductData {
  _id: string;
  name: string;
  image: string[];
  price: string;
  category: string[];
  subCategory: string[];
  description: string;
  unit: string;
  stock: string;
  discount: string;
  more_details: any;
  publish: boolean;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  productData,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const { control, handleSubmit, setValue, watch } = useForm<ProductData>({
    defaultValues: productData,
  });

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updateProduct] = useUpdateProductMutation();

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery("");
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetAllSubCategoryQuery("");

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    setIsImageModalVisible(true);
  };

  const handleDeleteImage = (img: string) => {
    const updatedImages = watch("image").filter(
      (image: string) => image !== img
    );
    setValue("image", updatedImages);
    toast.success("Image deleted successfully");
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };

  const onSubmit = async (data: any) => {
    setIsUpdating(true);
    try {
      const result = await updateProduct({
        id: productData._id,
        data: data,
      }).unwrap();
      if (result.success) {
        toast.success("Product updated successfully");
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    try {
      const result = await uploadImage(formData);
      if (result?.data?.data) {
        toast.success("Image uploaded successfully");
        setValue("image", [...watch("image"), result?.data?.data]);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Product"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Product Name"
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded"
              />
            )}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter Product Description"
                required
                rows={3}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded resize-none"
              />
            )}
          />
        </div>

        <div>
          <p>Image</p>
          <div>
            <label
              htmlFor="productImage"
              className="bg-blue-50 h-24 border rounded flex cursor-pointer justify-center items-center"
            >
              <div className="flex items-center justify-center flex-col">
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <>
                    <FaCloudUploadAlt size={35} />
                    <p>Upload Image</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id="productImage"
                className="hidden"
                onChange={handleUploadImage}
              />
            </label>
            <div className="my-2 flex flex-wrap gap-2">
              {watch("image").map((img: string | undefined, index: any) => (
                <div
                  key={`${img}-${index}`}
                  className="h-20 w-20 min-w-20 border bg-blue-50 cursor-pointer relative"
                >
                  <img
                    src={img}
                    alt={`Uploaded image ${index}`}
                    className="w-full h-full object-cover"
                    onClick={() => handleImageClick(img as string)}
                  />
                  <div className="absolute top-1 right-1 bg-white p-1 rounded-full cursor-pointer">
                    <FaEye
                      className="text-gray-600"
                      onClick={() => handleImageClick(img as string)}
                    />
                  </div>
                  <div className="absolute top-1 left-1 bg-white p-1 rounded-full cursor-pointer">
                    <FaTrash
                      className="text-red-600"
                      onClick={() => handleDeleteImage(img as string)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="category">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                placeholder="Select categories"
                className="w-full"
                loading={isCategoriesLoading}
              >
                {categories?.data?.map((category: any) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="subCategory">Sub Category</label>
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                placeholder="Select sub-categories"
                className="w-full"
                loading={isSubCategoriesLoading}
              >
                {subCategories?.data?.map((subCategory: any) => (
                  <Select.Option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="unit">Unit</label>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter Unit"
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded"
                />
              )}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="Price">Price</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter price"
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded"
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="stock">Stock</label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Stock"
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded"
                />
              )}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="discount">Discount</label>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Discount"
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-light rounded"
                />
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary mt-4 hover:bg-primary-light py-2 px-4 rounded font-semibold flex items-center justify-center gap-2"
          disabled={isUpdating}
        >
          {isUpdating ? <Spin size="small" /> : <p>Update Product</p>}
        </button>
      </form>

      <Modal
        visible={isImageModalVisible}
        footer={null}
        onCancel={closeImageModal}
        centered
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto max-h-[80vh]"
          />
        )}
      </Modal>
    </Modal>
  );
};

export default EditProductModal;
