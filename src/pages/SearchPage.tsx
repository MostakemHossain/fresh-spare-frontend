/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";
import { useGetAllProductQuery } from "../redux/features/product/productApi";
import { useDebounced } from "../redux/hooks";

const SearchPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("q") || "";

  const query: Record<string, any> = {
    page,
    limit: 10, // Number of items per page
    searchTerm: searchText,
  };

  const debouncedTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductQuery({ ...query });

  useEffect(() => {
    if (debouncedTerm !== searchText) {
      setPage(1);
      setData([]);
      setHasMore(true);
    }
  }, [debouncedTerm, searchText]);

  useEffect(() => {
    if (productsData?.data?.data) {
      const newData = productsData.data.data;

      setData((prevData) => [...prevData, ...newData]);
      setHasMore(page < productsData.data.total.totalPage);
    }
  }, [productsData]);

  const handleFetchMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
          {new Array(10).fill(null).map((_, index) => (
            <CardLoading key={`loading-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data?.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchMore}
          hasMore={hasMore}
          loader={<h4></h4>}
          endMessage={
            <p className="text-center font-semibold py-4">No more results.</p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + "searchProduct" + index} />
            ))}
          </div>
        </InfiniteScroll>

        {data.length === 0 && !isLoading && (
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <img
              src="https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg"
              alt="No data found"
              className="w-full h-full max-w-xs max-h-xs block"
            />
            <p className="font-semibold my-2">No Data Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
