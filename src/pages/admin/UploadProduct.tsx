/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaEye, FaTrash } from "react-icons/fa";
import AddField from "../../components/AddField";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from "../../redux/features/product/productApi";
import { useGetAllSubCategoryQuery } from "../../redux/features/subCategory/subCategoryApi";

interface ProductData {
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

const UploadProduct = () => {
  const [uploadImage] = useUploadImageMutation();
  const { control, handleSubmit, setValue, watch, reset } =
    useForm<ProductData>({
      defaultValues: {
        name: "",
        image: [],
        price: "",
        category: [],
        subCategory: [],
        description: "",
        unit: "",
        stock: "",
        discount: "",
        more_details: {},
        publish: true,
      },
    });

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [createProduct] = useCreateProductMutation();

  const handleAddField = () => {
    setValue("more_details", {
      ...watch("more_details"),
      [fieldName]: "",
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoryQuery("");
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetAllSubCategoryQuery("");

  if (isCategoriesLoading || isSubCategoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    setIsModalVisible(true);
  };

  const handleDeleteImage = (img: string) => {
    const updatedImages = watch("image").filter((image) => image !== img);
    setValue("image", updatedImages);
    toast.success("Image deleted successfully");
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const onSubmit = async (data: ProductData) => {
    setIsLoading(true);
    try {
      const result = await createProduct(data).unwrap();
      if (result.success) {
        toast.success("Product created successfully");
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setIsLoading(false);
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
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">Upload product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
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
          <div className="grid gap-1">
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
                    <div className=" text-primary">
                      <Flex align="center" gap="middle">
                        <Spin size="large" />
                      </Flex>
                    </div>
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
                {watch("image").map((img, index) => (
                  <div
                    key={`${img}-${index}`}
                    className="h-20 w-20 min-w-20 border bg-blue-50 cursor-pointer relative"
                  >
                    <img
                      src={img}
                      alt={`Uploaded image ${index}`}
                      className="w-full h-full object-cover"
                      onClick={() => handleImageClick(img)}
                    />
                    <div className="absolute top-1 right-1 bg-white p-1 rounded-full cursor-pointer">
                      <FaEye
                        className="text-gray-600"
                        onClick={() => handleImageClick(img)}
                      />
                    </div>
                    <div className="absolute top-1 left-1 bg-white p-1 rounded-full cursor-pointer">
                      <FaTrash
                        className="text-red-600"
                        onClick={() => handleDeleteImage(img)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Category */}
            <div className="grid gap-1">
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

            {/* Select Sub Category */}
            <div className="grid gap-1">
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
                      <Select.Option
                        key={subCategory._id}
                        value={subCategory._id}
                      >
                        {subCategory.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <div className="grid gap-1">
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

            <div className="grid gap-1">
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
          <div className="grid gap-1">
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

          <div className="grid gap-1">
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

          {/**add more field**/}
          {Object?.keys(watch("more_details"))?.map((k, index) => {
            return (
              <div key={index} className="grid gap-1">
                <label htmlFor={k} className="font-medium">
                  {k}
                </label>
                <Controller
                  name={`more_details.${k}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      required
                      className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                    />
                  )}
                />
              </div>
            );
          })}

          <div
            onClick={() => setOpenAddField(true)}
            className="w-36 px-3 py-2 rounded-md text-center font-semibold hover:bg-primary border border-primary cursor-pointer"
          >
            Add Fields
          </div>

          <button
            type="submit"
            className="bg-primary mt-1 hover:bg-primary-light py-2 px-4 rounded font-semibold flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? <Spin size="small" /> : <p>Submit</p>}
          </button>
        </form>
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        centered
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-[400px] h-[400px]"
          />
        )}
      </Modal>
      {openAddField && (
        <AddField
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
