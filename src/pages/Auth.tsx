/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import auth from "../assets/images/auth.webp";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
    setValue: setLoginValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: registerHandleSubmit,
    formState: { errors: registerErrors },
    setValue: setRegisterValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const handleAutofill = (role: string) => {
    if (isLogin) {
      setLoginValue("email", `${role}101@gmail.com`);
      setLoginValue("password", `${role}12345`);
    } else {
      setRegisterValue("username", role);
      setRegisterValue("email", `${role}101@gmail.com`);
      setRegisterValue("password", `${role}@gmail.com`);
    }
  };

  const handleModeSwitch = (loginMode: boolean) => {
    setIsLogin(loginMode);
    if (loginMode) {
      setLoginValue("email", "");
      setLoginValue("password", "");
    } else {
      setRegisterValue("username", "");
      setRegisterValue("email", "");
      setRegisterValue("password", "");
    }
  };

  const onSubmitLogin = async (data: LoginForm) => {
    setLoading(true);
    try {
      const result = await login(data).unwrap();
      const user = await verifyToken(result?.data?.accessToken);

      toast.success("Login successfully");
      dispatch(setUser({ user: user, token: result?.data?.accessToken }));
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitRegister = async (data: RegisterForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-primary text-black">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <img
          src={auth}
          alt="Authentication illustration"
          width={400}
          height={400}
          className="max-w-md w-full hidden lg:block"
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
              onClick={() => handleModeSwitch(true)}
              className={`pb-1 transition-colors ${
                isLogin
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-black"
              }`}
              type="submit"
            >
              Login
            </button>
            <button
              onClick={() => handleModeSwitch(false)}
              className={`pb-1 transition-colors ${
                !isLogin
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-black"
              }`}
              type="submit"
            >
              Register
            </button>
          </div>
          <p className="text-black">
            {isLogin
              ? "Use your credentials to login into account."
              : "Enter your information to setup a new account."}
          </p>

          <form
            onSubmit={
              isLogin
                ? loginHandleSubmit(onSubmitLogin)
                : registerHandleSubmit(onSubmitRegister)
            }
            className="space-y-4"
          >
            {!isLogin && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Username"
                  {...registerRegister("username")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                />
                {registerErrors.username && (
                  <p className="text-red-500 text-sm">
                    {registerErrors.username.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                {...(isLogin
                  ? loginRegister("email")
                  : registerRegister("email"))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
              />
              {(isLogin ? loginErrors.email : registerErrors.email) && (
                <p className="text-red-500 text-sm">
                  {
                    (isLogin ? loginErrors.email : registerErrors.email)
                      ?.message
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...(isLogin
                    ? loginRegister("password")
                    : registerRegister("password"))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-black hover:text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {(isLogin ? loginErrors.password : registerErrors.password) && (
                <p className="text-red-500 text-sm">
                  {
                    (isLogin ? loginErrors.password : registerErrors.password)
                      ?.message
                  }
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-32 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {loading ? <p>Loading...</p> : isLogin ? "Login" : "Register"}
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
              className="flex items-center justify-center w-full rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-semibold focus:outline-none"
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
