/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { validURLConvert } from "../utils/validURLConvert";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }: { data: any }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;

  return (
    <Link
      to={url}
      className="border py-2 p-1  lg:p-4 grid gap-1 lg:gap-3 w-36 lg:min-w-52 rounded cursor-pointer shadow-md"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32  rounded overflow-hidden">
        <img
          src={data?.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>
      <div className="flex justify-end">
        {data?.discount > 0 && (
          <div className="flex ">
            {Boolean(data?.discount) && (
              <p className=" bg-green-300 font-bold px-2 py-2 w-fit text-xs rounded-full">
                {data?.discount} % discount
              </p>
            )}
          </div>
        )}
      </div>
      <div className="font-medium text-ellipsis line-clamp-2">{data?.name}</div>
      <div className="w-fit px-2 lg:px-0 text-sm lg:text-base font-bold">
        {data.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3">
        <div className="flex items-center gap-1">
          <div className="font-semibold text-red-500">
            {DisplayPriceInDollar(pricewithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div className="">
          {data.stock === 0 ? (
            <p className="text-red-500 text-sm text-center font-bold">
              Out of Stock
            </p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
