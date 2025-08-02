import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContex";
import { clearCart } from "../../redux/features/cart/cartSlice";
import Loading from "../../components/Loading";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0)
    .toFixed(2);
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [orderError, setOrderError] = useState("");

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      setOrderError(
        "Your cart is empty. Please add items to your cart before checkout."
      );
      return;
    }

    // Create an array with book IDs repeated according to their quantities
    const productIdsWithQuantities = cartItems.flatMap((item) => {
      const quantity = item.quantity || 1;
      return Array(quantity).fill(item._id);
    });

    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        street: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: productIdsWithQuantities,
      totalPrice: parseFloat(totalPrice),
    };

    try {
      await createOrder(newOrder).unwrap();
      // Clear the cart after successful order
      dispatch(clearCart());
      Swal.fire({
        title: "Order Confirmed",
        text: "Your order has been placed successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "View My Orders",
      });
      navigate("/orders");
    } catch (err) {
      console.error("Error placing an order", err);
      setOrderError(
        err?.data?.message || "Failed to place your order. Please try again."
      );
      Swal.fire({
        title: "Error",
        text: "There was a problem placing your order.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (isLoading) return <Loading />;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/books"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Cash On Delivery
              </h2>
              <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
              <p className="text-gray-500 mb-6">Items: {totalItems}</p>
            </div>

            {orderError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{orderError}</span>
              </div>
            )}

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  Order Summary
                </h3>
                <div className="bg-gray-50 p-4 rounded">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center mb-2"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="font-medium">
                        Rs {(item.newPrice * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between font-bold">
                      <p>Total:</p>
                      <p>Rs {totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9+\s-]+$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="+123 4567890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", {
                          required: "City is required",
                        })}
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("country", {
                            required: "Country is required",
                          })}
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                      </div>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("state", {
                            required: "State is required",
                          })}
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                      </div>
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode", {
                          required: "Zipcode is required",
                        })}
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.zipcode.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="underline underline-offset-2 text-blue-600"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="underline underline-offset-2 text-blue-600"
                          >
                            Shopping Policy
                          </Link>
                          .
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          disabled={!isChecked || isLoading}
                          className={`${
                            !isChecked || isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700"
                          } text-white font-bold py-2 px-4 rounded`}
                        >
                          {isLoading ? "Processing..." : "Place an Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
