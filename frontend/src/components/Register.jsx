import { updateProfile } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaCheck, FaEye, FaEyeSlash, FaGoogle, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

const Register = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
      noCommon: true,
    },
  });

  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  // Common passwords to check against
  const commonPasswords = [
    "password",
    "123456",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "password123",
    "admin",
    "qwerty",
    "abc123",
    "letmein",
    "monkey",
    "dragon",
    "master",
    "welcome",
    "iloveyou",
    "princess",
    "football",
    "welcome123",
  ];

  // Password strength assessment
  const assessPasswordStrength = (pwd) => {
    const checks = {
      length: pwd.length >= 8 && pwd.length <= 128,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pwd),
      noCommon: !commonPasswords.includes(pwd.toLowerCase()),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let label, color;
    if (score <= 2) {
      label = "Very Weak";
      color = "text-red-600";
    } else if (score <= 3) {
      label = "Weak";
      color = "text-orange-500";
    } else if (score <= 4) {
      label = "Fair";
      color = "text-yellow-500";
    } else if (score <= 5) {
      label = "Good";
      color = "text-blue-500";
    } else {
      label = "Strong";
      color = "text-green-600";
    }

    return { score, label, color, checks };
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(assessPasswordStrength(password));
    } else {
      setPasswordStrength({
        score: 0,
        label: "",
        color: "",
        checks: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false,
          noCommon: true,
        },
      });
    }
  }, [password]);

  // Enhanced password validation
  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (value.length > 128) return "Password must not exceed 128 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/\d/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(value))
      return "Password must contain at least one special character";
    if (commonPasswords.includes(value.toLowerCase()))
      return "Please choose a less common password";

    // Additional security checks
    if (/(.)\1{2,}/.test(value))
      return "Cannot contain 3 or more repeating characters";

    // Check for keyboard patterns
    const keyboardPatterns = ["qwerty", "asdf", "1234", "abcd"];
    if (
      keyboardPatterns.some((pattern) => value.toLowerCase().includes(pattern))
    ) {
      return "Cannot contain keyboard patterns";
    }

    return true;
  };

  // Register user with enhanced security
  const onSubmit = async (data) => {
    try {
      // Check if reCAPTCHA is completed
      if (!captchaValue) {
        setMessage("Please complete the reCAPTCHA verification");
        return;
      }

      // Additional client-side validation
      if (data.password !== data.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      if (passwordStrength.score < 5) {
        setMessage(
          "Please choose a stronger password that meets all requirements"
        );
        return;
      }

      // Register the user with email, password, and reCAPTCHA token
      const userCredential = await registerUser(data.email, data.password, captchaValue);

      // Reset reCAPTCHA after successful registration
      recaptchaRef.current.reset();
      setCaptchaValue(null);

      // Update the user profile with the username
      await updateProfile(userCredential.user, {
        displayName: data.username,
      });

      // Get the Firebase token
      const firebaseToken = await userCredential.user.getIdToken();

      // Store the token in localStorage
      localStorage.setItem('token', firebaseToken);

      // Store password metadata (for future security features)
      const userMetadata = {
        passwordCreated: new Date().toISOString(),
        passwordStrength: passwordStrength.score,
        // Note: Never store actual passwords client-side
      };

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage(
          "Email is already registered. Please use a different email or try logging in."
        );
      } else if (error.code === "auth/weak-password") {
        setMessage("Password is too weak. Please choose a stronger password.");
      } else {
        setMessage("Registration failed. Please check your information.");
      }
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };

  // Component for password requirements
  const PasswordRequirement = ({ met, text }) => (
    <div
      className={`flex items-center text-xs ${met ? "text-green-600" : "text-gray-500"
        } mb-1`}
    >
      {met ? (
        <FaCheck className="mr-2 text-xs" />
      ) : (
        <FaTimes className="mr-2 text-xs" />
      )}
      {text}
    </div>
  );

  // Component for strength bar
  const StrengthBar = ({ score }) => {
    const bars = Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className={`h-1 flex-1 mx-0.5 rounded ${i < score
          ? score <= 2
            ? "bg-red-500"
            : score <= 3
              ? "bg-orange-500"
              : score <= 4
                ? "bg-yellow-500"
                : score <= 5
                  ? "bg-blue-500"
                  : "bg-green-500"
          : "bg-gray-200"
          }`}
      />
    ));
    return <div className="flex mt-1">{bars}</div>;
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Username must not exceed 30 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field with Security Features */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { validate: validatePassword })}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">
                    Password Strength:
                  </span>
                  <span
                    className={`text-xs font-semibold ${passwordStrength.color}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <StrengthBar score={passwordStrength.score} />
              </div>
            )}

            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password Requirements */}
            {password && (
              <div className="mt-3 p-3 bg-gray-50 rounded text-xs">
                <div className="font-semibold text-gray-700 mb-2">
                  Password Requirements:
                </div>
                <PasswordRequirement
                  met={passwordStrength.checks.length}
                  text="8-128 characters long"
                />
                <PasswordRequirement
                  met={passwordStrength.checks.uppercase}
                  text="At least one uppercase letter"
                />
                <PasswordRequirement
                  met={passwordStrength.checks.lowercase}
                  text="At least one lowercase letter"
                />
                <PasswordRequirement
                  met={passwordStrength.checks.number}
                  text="At least one number"
                />
                <PasswordRequirement
                  met={passwordStrength.checks.special}
                  text="At least one special character"
                />
                <PasswordRequirement
                  met={passwordStrength.checks.noCommon}
                  text="Not a common password"
                />
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p className="text-green-600 text-xs mt-1 flex items-center">
                <FaCheck className="mr-1" /> Passwords match
              </p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="mb-4 flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lcf25crAAAAAPfzMHbGzZWe0HT9WiBkG5BZG9zu"
              onChange={(value) => setCaptchaValue(value)}
              onExpired={() => setCaptchaValue(null)}
            />
          </div>

          {/* Error Message */}
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          {/* Submit Button */}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
