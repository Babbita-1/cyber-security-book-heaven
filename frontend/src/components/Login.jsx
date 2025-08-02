import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContex";

const Login = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);

  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if account is currently locked
  React.useEffect(() => {
    const checkLockout = () => {
      if (lockoutTime && new Date() < lockoutTime) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
        setLockoutTime(null);
        setFailedAttempts(0);
      }
    };

    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime]);

  const handleAccountLockout = () => {
    const newFailedAttempts = failedAttempts + 1;
    setFailedAttempts(newFailedAttempts);

    if (newFailedAttempts >= 5) {
      const lockTime = new Date();
      lockTime.setMinutes(lockTime.getMinutes() + 15); // 15-minute lockout
      setLockoutTime(lockTime);
      setIsLocked(true);
      toast.error(
        "🔒 Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes.",
      );
    } else {
      const remaining = 5 - newFailedAttempts;
      toast.warn(
        `⚠️ Invalid credentials. ${remaining} attempts remaining before account lockout.`,
      );
    }
  };

  const onSubmit = async (data) => {
    if (isLocked) {
      const remainingTime = Math.ceil((lockoutTime - new Date()) / 60000);
      toast.error(
        `🔒 Account is locked. Please try again in ${remainingTime} minutes.`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await loginUser(data.email, data.password);

      // Reset failed attempts on successful login
      setFailedAttempts(0);
      setIsLocked(false);
      setLockoutTime(null);

      toast.success("🎉 Login successful! Welcome back!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate("/"),
      });

      // Small delay to show toast before navigation
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error types
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email address.", {
          position: "top-center",
          autoClose: 5000,
        });
        setMessage("No account found with this email address.");
      } else if (error.code === "auth/wrong-password") {
        handleAccountLockout();
        setMessage("Invalid email or password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.", {
          position: "top-right",
          autoClose: 4000,
        });
        setMessage("Please enter a valid email address.");
      } else if (error.code === "auth/user-disabled") {
        toast.error(
          "This account has been disabled. Please contact support.",
          {
            position: "top-center",
            autoClose: 6000,
          }
        );
        setMessage("Account has been disabled. Please contact support.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Please try again later.", {
          position: "top-center",
          autoClose: 6000,
        });
        setMessage("Too many failed attempts. Please try again later.");
      } else {
        handleAccountLockout();
        setMessage("Please provide a valid email and password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLocked) {
      const remainingTime = Math.ceil((lockoutTime - new Date()) / 60000);
      toast.error(
        `🔒 Account is locked. Please try again in ${remainingTime} minutes.`,
        {
          position: "top-centre",
          autoClose: 5000,
        }
      );
      return;
    }

    setIsLoading(true);

    try {
      await signInWithGoogle();

      // Reset failed attempts on successful login
      setFailedAttempts(0);
      setIsLocked(false);
      setLockoutTime(null);

      toast.success("🎉 Google sign-in successful! Welcome!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate("/"),
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Google sign-in error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        toast.info("ℹ️ Sign-in cancelled by user.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (error.code === "auth/network-request-failed") {
        toast.error("🌐 Network error. Please check your connection.", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        toast.error("❌ Google sign-in failed. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRemainingLockTime = () => {
    if (!lockoutTime) return 0;
    return Math.ceil((lockoutTime - new Date()) / 60000);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>

        {/* Account Lockout Warning */}
        {isLocked && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <div>
                <div className="font-semibold">Account Temporarily Locked</div>
                <div className="text-xs">
                  Try again in {getRemainingLockTime()} minutes
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Failed Attempts Warning */}
        {failedAttempts > 0 && failedAttempts < 5 && !isLocked && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <div>
                <div className="font-semibold">Security Alert</div>
                <div className="text-xs">
                  {5 - failedAttempts} attempts remaining
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              disabled={isLocked || isLoading}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${isLocked || isLoading ? "bg-gray-100 cursor-not-allowed" : ""
                } ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                disabled={isLocked || isLoading}
                className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow ${isLocked || isLoading ? "bg-gray-100 cursor-not-allowed" : ""
                  } ${errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked || isLoading}
              >
                {showPassword ? (
                  <FaEyeSlash
                    className={`text-gray-500 ${isLocked || isLoading ? "opacity-50" : ""
                      }`}
                  />
                ) : (
                  <FaEye
                    className={`text-gray-500 ${isLocked || isLoading ? "opacity-50" : ""
                      }`}
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="mb-4">
            <button
              type="submit"
              disabled={isLocked || isLoading}
              className={`w-full font-bold py-2 px-4 rounded focus:outline-none transition duration-200 ${isLocked || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm text-center">
          Haven't an account? Please
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 px-1">
            Register
          </Link>
        </p>

        {/* Forgot Password Link
        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            Forgot your password?
          </Link>
        </div> */}

        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLocked || isLoading}
            className={`w-full flex items-center justify-center font-bold py-2 px-4 rounded focus:outline-none transition duration-200 ${isLocked || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary hover:bg-blue-700 text-white"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <>
                <FaGoogle className="mr-2" />
                Sign in with Google
              </>
            )}
          </button>
        </div>

        {/* Security Information */}
        <div className="mt-4 p-2 bg-blue-50 rounded text-xs">
          <div className="font-semibold text-blue-800 mb-1">
            🔐 Security Features:
          </div>
          <ul className="text-blue-700 space-y-1">
            <li>• Account locks after 5 failed attempts</li>
            <li>• 15-minute automatic lockout period</li>
            <li>• Secure password visibility toggle</li>
          </ul>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Books Heaven. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
