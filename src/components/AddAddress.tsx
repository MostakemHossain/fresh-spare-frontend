/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useCreateAddressMutation } from "../redux/features/address/addressApi";

interface AddAddressProps {
  close: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ close }) => {
  const { register, handleSubmit } = useForm();
  const [createAddress] = useCreateAddressMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const result = await createAddress(data).unwrap();
      if (result.success) {
        toast.success("Address added successfully");
        close();
      }
    } catch (error: any) {
      toast.error(error.data.message || "Failed to add address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Add Address</h2>
          <button onClick={close} className="text-gray-500 hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {[
            "address_line",
            "city",
            "state",
            "pincode",
            "country",
            "mobile",
          ].map((field) => (
            <div className="grid gap-1" key={field}>
              <label htmlFor={field} className="capitalize">
                {field.replace("_", " ")}:
              </label>
              <input
                type="text"
                id={field}
                className="border bg-blue-50 p-2 rounded w-full"
                {...register(field, { required: true })}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-primary font-semibold py-2 rounded hover:bg-primary-light   relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Flex align="center" gap="middle">
                  <Spin size="small" />
                </Flex>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
