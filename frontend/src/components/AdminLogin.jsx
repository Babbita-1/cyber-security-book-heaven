import axios from "axios"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { FaBookOpen, FaLock, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import getBaseUrl from '../utils/baseURL'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        setMessage("")
        console.log('Attempting login with:', { username: data.username });

        try {
            console.log('Making request to:', `${getBaseUrl()}/api/auth/admin`);
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, {
                username: data.username,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const auth = response.data

            if (auth.token) {
                localStorage.setItem('token', auth.token)
                localStorage.setItem('adminUsername', auth.user.username)

                setTimeout(() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('adminUsername')
                    alert('Your session has expired. Please login again.')
                    navigate("/admin")
                }, 3600 * 1000)

                navigate("/dashboard")
            }
        } catch (error) {
            console.error('Login error:', error.response || error);
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (error.response?.status === 401) {
                setMessage("Invalid username or password");
            } else if (error.response?.status === 404) {
                setMessage("Server not found. Please check if the backend is running.");
            } else {
                setMessage("Login failed. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden'>
                <div className='bg-gray-900 text-white py-6 px-8 text-center'>
                    <FaBookOpen className='text-5xl mx-auto mb-4' />
                    <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
                    <p className='text-gray-300 mt-1'>Secure Login</p>
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
                                        required: "Username is required"
                                    })}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder='Enter your username'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.username && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.username.message}</p>
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
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    className='pl-10 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            {errors.password && (
                                <p className='text-red-500 text-xs italic mt-1'>{errors.password.message}</p>
                            )}
                        </div>

                        {message && (
                            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                                <p className='text-sm'>{message}</p>
                            </div>
                        )}

                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className='h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded'
                                />
                                <label htmlFor="remember" className='ml-2 block text-sm text-gray-700'>
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div className='w-full'>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <div className='mt-6 text-center'>
                        <Link to="/admin/register" className='text-sm text-gray-600 hover:text-gray-900'>
                            Don't have an account? Register here
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

export default AdminLogin