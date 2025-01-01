/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AddAddress from "../components/AddAddress";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useGetAddressQuery } from "../redux/features/address/addressApi";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";

const Checkout = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const { data } = useGetAddressQuery("");

  const handleCashOnDelivery = () => {
    if (selectedAddress === null) {
      alert("Please select an address.");
      return;
    }
    // Implement COD logic
    console.log("Cash on Delivery selected");
  };

  const handleOnlinePayment = () => {
    if (selectedAddress === null) {
      alert("Please select an address.");
      return;
    }
    // Implement Online Payment logic
    console.log("Online Payment selected");
  };

  return (
    <section className="bg-blue-50 min-h-screen py-8">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-5">
        {/* Address Selection */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Choose your address</h3>
          <div className="bg-white p-4 rounded shadow grid gap-4">
            {data?.data?.map((address: any, index: number) => (
              <label
                key={index}
                htmlFor={`address-${index}`}
                className={`border p-3 flex gap-3 rounded cursor-pointer ${
                  !address.status ? "hidden" : "hover:bg-blue-50"
                }`}
              >
                <input
                  id={`address-${index}`}
                  type="radio"
                  value={index}
                  checked={selectedAddress === index}
                  onChange={() => setSelectedAddress(index)}
                  name="address"
                  className="mt-1"
                />
                <div>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>
                    {address.country} - {address.pincode}
                  </p>
                  <p>{address.mobile}</p>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={() => setOpenAddress(true)}
            className="mt-4 bg-blue-100 border border-dashed border-blue-300 text-blue-600 font-semibold py-2 px-4 w-full rounded hover:bg-blue-200"
          >
            Add Address
          </button>
        </div>

        {/* Summary */}
        <div className="flex-1 max-w-md bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <p>Items total</p>
              <p className="text-right">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInDollar(notDiscountTotalPrice)}
                </span>{" "}
                {DisplayPriceInDollar(totalPrice)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Quantity total</p>
              <p>{totalQty} items</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>
            <div className="font-semibold flex justify-between">
              <p>Grand Total</p>
              <p>{DisplayPriceInDollar(totalPrice)}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>
            <button
              className="py-2 px-4 border border-green-600 text-green-600 font-semibold rounded hover:bg-green-600 hover:text-white"
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default Checkout;
