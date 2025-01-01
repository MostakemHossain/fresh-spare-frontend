import { Link, useLocation } from "react-router-dom";

const Cancel = () => {
  const location = useLocation();
  const cancelImageUrl =
    "https://via.placeholder.com/300x200?text=Cancel+Image";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <img
          src={cancelImageUrl}
          alt="Order Canceled"
          className="w-full rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          {location?.state?.text || "Order"} Canceled!
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but your order could not be completed. Please try again
          or contact support for assistance.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="inline-block bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition"
          >
            Go to Homepage
          </Link>
          <Link
            to="/support"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
