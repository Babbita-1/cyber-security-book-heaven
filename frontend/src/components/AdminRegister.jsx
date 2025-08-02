import axios from "axios"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { FaBookOpen, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import getBaseUrl from '../utils/baseURL'

const AdminRegister = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    const navigate = useNavigate()
    const password = watch("password", "")

    const onSubmit = async (data) => {
        setLoading(true)
        setMessage("")

        try {
            // First check if the server is accessible
            try {
                await axios.options(`${getBaseUrl()}/api/auth/admin/register`);
            } catch (error) {
                console.error("CORS preflight failed:", error);
                throw new Error("Unable to connect to the server. Please try again later.");
            }

            const response = await axios.post(`${getBaseUrl()}/api/auth/admin/register`, {
                username: data.username,
                email: data.email,
                password: data.password,
                role: 'admin'
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                withCredentials: true
            })

            if (response.status === 201) {
                setMessage("Registration successful! Redirecting to login...")
                setTimeout(() => {
                    navigate("/admin")
                }, 2000)
            }
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(error.response.data.message || "Registration failed with server error.");
                console.error("Server response:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage("No response from server. Please check your connection.");
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage(error.message || "Registration failed. Please try again.");
                console.error("Error setting up request:", error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden'>
                <div className='bg-gray-900 text-white py-6 px-8 text-center'>
                    <FaBookOpen className='text-5xl mx-auto mb-4' />
                    <h2 className='text-2xl font-bold'>Admin Registration</h2>
                    <p className='text-gray-300 mt-1'>Create Admin Account</p>
                </div>

                <div className='p-8'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-6 relative'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
                                Username
                            </label>
                            <div className='flex items-center'>
                                <span className='absolute left-3 text-gray-500'>
                                    <FaUser />
                                </span>
                                <input
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message: "Username must be at least 3 characters"
                                        }
                                    })}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder='Choose a username'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.username && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.username.message}</p>
                            )}
                        </div>

                        <div className='mb-6 relative'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                                Email
                            </label>
                            <div className='flex items-center'>
                                <span className='absolute left-3 text-gray-500'>
                                    <FaEnvelope />
                                </span>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your email'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.email && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.email.message}</p>
                            )}
                        </div>

                        <div className='mb-6 relative'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                                Password
                            </label>
                            <div className='flex items-center'>
                                <span className='absolute left-3 text-gray-500'>
                                    <FaLock />
                                </span>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                                        }
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder='Create a password'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.password.message}</p>
                            )}
                        </div>

                        <div className='mb-6 relative'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className='flex items-center'>
                                <span className='absolute left-3 text-gray-500'>
                                    <FaLock />
                                </span>
                                <input
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder='Confirm your password'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {message && (
                            <div className={`mb-4 p-3 border rounded ${message.includes('successful')
                                ? 'bg-green-100 border-green-400 text-green-700'
                                : 'bg-red-100 border-red-400 text-red-700'
                                }`}>
                                <p className='text-sm'>{message}</p>
                            </div>
                        )}

                        <div className='w-full'>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>

                    <div className='mt-6 text-center'>
                        <Link to="/admin" className='text-sm text-gray-600 hover:text-gray-900'>
                            Already have an account? Sign in
                        </Link>
                    </div>

                    <div className='mt-4 text-center'>
                        <Link to="/" className='text-sm text-gray-600 hover:text-gray-900'>
                            Return to Book Store
                        </Link>
                    </div>

                    <div className='mt-8 pt-6 border-t border-gray-200'>
                        <p className='text-center text-gray-500 text-xs'>
                            &copy; {new Date().getFullYear()} Book Store Admin. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister
