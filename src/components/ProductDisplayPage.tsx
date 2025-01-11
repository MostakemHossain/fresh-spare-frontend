/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Spin } from "antd";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import img2 from "../assets/images/best price.avif";
import img1 from "../assets/images/fast-delivery.avif";
import img3 from "../assets/images/quality.png";
import { useGetProductDetailsQuery } from "../redux/features/product/productApi";
import { DisplayPriceInDollar } from "../utils/DisplayProductInDoller";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];
  const [image, setImage] = useState(0);
  const imageContainer = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetProductDetailsQuery(productId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );

  const productImages = data?.data?.image || [];

  const handleScrollRight = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft += 100;
    }
  };

  const handleScrollLeft = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft -= 100;
    }
  };

  return (
    <div>
      <Header />
      <div>
        <section className="container mx-auto p-4 grid lg:grid-cols-2">
          {/* Main Image */}
          <div>
            <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
              <img
                src={productImages[image]}
                alt={`Product image ${image + 1}`}
                className="w-full h-full object-scale-down"
              />
            </div>
            {/* Image Thumbnails */}
            <div className="flex items-center justify-center gap-3 my-2">
              {productImages.map((img: any, index: number) => (
                <div
                  key={img + index}
                  onClick={() => setImage(index)}
                  className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full cursor-pointer ${
                    index === image && "bg-slate-300"
                  }`}
                ></div>
              ))}
            </div>
            <div className="grid relative">
              <div
                ref={imageContainer}
                className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
              >
                {productImages.map((img: any, index: number) => (
                  <div
                    className="w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md"
                    key={img + index}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setImage(index)}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center">
                <button
                  onClick={handleScrollLeft}
                  className="z-10 bg-white relative p-1 rounded-full shadow-lg"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="z-10 bg-white relative p-1 rounded-full shadow-lg"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
            <div className="my-4 hidden lg:grid gap-3">
              <div>
                <p className="font-bold text-2xl mt-4 mb-4">Description</p>
                <p className="text-base">{data?.data?.description}</p>
              </div>
              <div>
                <p className="font-semibold">Unit</p>
                <p className="text-base">{data?.data?.unit}</p>
              </div>
              {data?.data?.more_details &&
                Object.keys(data?.data?.more_details).map((element, index) => (
                  <div key={index}>
                    <p className="font-semibold">{element}</p>
                    <p className="text-base">
                      {data?.data?.more_details[element]}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="p-4 lg:pl-7 text-base lg:text-lg">
            <h2 className="text-lg font-semibold lg:text-3xl">
              {data?.data?.name}
            </h2>
            <p>{data?.data?.unit}</p>
            <Divider />
            <div>
              <p className="font-semibold lg:mb-2">Price</p>
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
                  <p className="font-semibold text-red-500 text-lg lg:text-xl">
                    {DisplayPriceInDollar(
                      pricewithDiscount(data?.data?.price, data?.data?.discount)
                    )}
                  </p>
                </div>
                {data?.data?.discount && (
                  <>
                    <p className="line-through decoration-red-500">
                      {DisplayPriceInDollar(data?.data?.price)}
                    </p>
                    <p className="font-bold text-green-600 lg:text-2xl">
                      {data?.data?.discount}%{" "}
                      <span className="text-base text-neutral-500">
                        Discount
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
            {data?.data?.stock === 0 ? (
              <p className="text-lg text-red-500 my-2">Out of Stock</p>
            ) : (
              <div className="my-4">
                <AddToCartButton data={data?.data} />
              </div>
            )}
            <h2 className="font-semibold">Why shop from Fresh Spare</h2>
            <div>
              <div className="flex items-center gap-4 my-4">
                <img
                  src={img1}
                  alt="Superfast Delivery"
                  className="w-24 h-20 rounded-2xl"
                />
                <div className="text-sm">
                  <div className="font-semibold">Superfast Delivery</div>
                  <p>
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 my-4">
                <img
                  src={img2}
                  alt="Best Prices & Offers"
                  className="w-24 h-20"
                />
                <div className="text-sm">
                  <div className="font-semibold">Best Prices & Offers</div>
                  <p>
                    Best price destination with offers directly from the
                    manufacturers.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 my-4">
                <img src={img3} alt="Wide Assortment" className="w-24 h-20" />
                <div className="text-sm">
                  <div className="font-semibold">Wide Assortment</div>
                  <p>
                    Choose from 5000+ products across food, personal care,
                    household & other categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDisplayPage;
