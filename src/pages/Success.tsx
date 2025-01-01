import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const successImageUrl =
    "https://img.freepik.com/premium-vector/order-confirmed-concept-illustration_353829-159.jpg?semt=ais_hybrid";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <img
          src={successImageUrl}
          alt="Order Success"
          className="w-full rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {location?.state?.text || "Order"} Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed. You will receive a confirmation email shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;
