/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerificationOTPMutation } from "../redux/features/auth/authApi";

interface OTPFormInputs {
  otp: string[];
}

const OTPVerification: React.FC = () => {
  const [verificationOTP] = useVerificationOTPMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<OTPFormInputs>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/forgot-password");
    }
  }, [location]);

  const onSubmit: SubmitHandler<OTPFormInputs> = async (data) => {
    const otpCode = data.otp.join("");
    try {
      setLoading(true);
      const payload = {
        otp: otpCode,
        email: location?.state?.email,
      };
      const res = await verificationOTP(payload).unwrap();
      if (res.success) {
        toast.success("OTP verified successfully");
        navigate("/reset-password", {
          state: {
            data: res,
            email: location?.state?.email,
          },
        });
      }
    } catch (error: any) {
      console.error(error.data);
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      if (value && index < 5) {
        setFocus(`otp.${index + 1}`);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      setFocus(`otp.${index - 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Please enter the 6-digit OTP sent to your email or phone number.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                {...register(`otp.${index}`, {
                  required: "All OTP fields are required",
                  pattern: {
                    value: /^\d$/,
                    message: "Only digits are allowed",
                  },
                })}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-xs mt-2 text-center">
              {errors.otp[0]?.message ||
                "Please fill out all fields correctly."}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-black rounded-md focus:ring-2 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-800"
              onClick={() => console.log("Resend OTP logic here")}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
