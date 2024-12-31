/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";
import { validURLConvert } from "../utils/validURLConvert";

const CardProduct = ({ data }: { data: any }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;
  return (
    <Link
      to={url}
      className="border py-2 p-1  lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data?.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>
      <div className="rounded text-sm w-fit p-[3.5px]  px-2 text-green-600 bg-green-50 ">
        10 min
      </div>
      <div className="font-medium text-ellipsis line-clamp-2">{data?.name}</div>
      <div className="w-fit ">{data.unit}</div>

      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{DisplayPriceInDollar(data.price)}</div>
        <div className="">
          <button className="bg-green-600 hover:bg-green-700  text-white px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
