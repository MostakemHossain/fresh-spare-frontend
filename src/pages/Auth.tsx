
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import auth from "../assets/images/auth.webp";

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleAutofill = (role: string) => {
    if (role === "user") {
      setCredentials({
        email: "user@example.com",
        password: "userpassword",
        username: "user",
      });
    } else if (role === "admin") {
      setCredentials({
        email: "admin@example.com",
        password: "adminpassword",
        username: "admin",
      });
    }
  };

  

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-primary text-black">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <img
          src={auth}
          alt="Authentication illustration"
          width={400}
          height={400}
          className="max-w-md w-full"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300"
            >
              Go Back
            </button>
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded" />
              <span className="text-xl font-semibold">
                <p className="text-xl font-bold">
                  FRESH <span className="text-pink-500">SPARE</span>
                </p>
              </span>
            </div>
          </div>

          <div className="flex gap-8 text-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-1 transition-colors ${
                isLogin
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-black"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-1 transition-colors ${
                !isLogin
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-black"
              }`}
            >
              Register
            </button>
          </div>
          <p className="text-black">
            {isLogin
              ? "Use your credentials to login into account."
              : "Enter your information to setup a new account."}
          </p>

          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-black hover:text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-32 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {isLogin ? "Login" : "Register"}
              </button>
              {isLogin && (
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
          </form>

          <div className="flex flex-col items-center mt-4 gap-2">
          <button
              type="button"
              className="flex items-center justify-center w-full rounded-lg  bg-indigo-600 text-white px-4 py-2 text-sm font-semibold  focus:outline-none"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <p className="text-sm">or</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAutofill("user")}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
              >
                User
              </button>
              <button
                onClick={() => handleAutofill("admin")}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
