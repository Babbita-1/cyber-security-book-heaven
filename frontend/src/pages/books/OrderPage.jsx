import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContex';
import { format, isValid } from 'date-fns';
import Loading from '../../components/Loading';

const OrderPage = () => {
    const { currentUser } = useAuth();

    // Helper function to safely format date
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return isValid(date) ? format(date, 'MMM dd, yyyy') : 'N/A';
        } catch (error) {
            return 'N/A';
        }
    };

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
    
    if (isLoading) return <Loading />;
    if (isError) return <div className="container mx-auto p-6 text-red-500">Error getting orders data</div>;
    
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                orders.length === 0 ? (
                    <div className="p-4 bg-gray-100 rounded-md text-gray-600">No orders found!</div>
                ) : (
                    <div className="space-y-6">
                        {
                            orders.map((order, index) => (
                                <div key={order._id || index} className="border rounded-lg shadow-sm p-4 bg-white">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className='p-1 bg-secondary text-white w-10 rounded mb-1 text-center'>#{index + 1}</p>
                                        <p className="text-sm text-gray-500">Ordered on: {formatDate(order.createdAt)}</p>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h2 className="font-bold text-lg">Order Information</h2>
                                            <p className="text-gray-600">Order ID: {order._id || 'N/A'}</p>
                                            <p className="text-gray-600">Name: {order.name || 'N/A'}</p>
                                            <p className="text-gray-600">Email: {order.email || 'N/A'}</p>
                                            <p className="text-gray-600">Phone: {order.phone || 'N/A'}</p>
                                            <p className="text-gray-600">Total Price: {order.totalPrice ? `$${order.totalPrice.toFixed(2)}` : '$0.00'}</p>
                                            <p className="text-gray-600">Status: 
                                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {order.status || 'pending'}
                                                </span>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-bold text-lg">Shipping Address</h3>
                                            {order.address ? (
                                                <p className="text-gray-600">
                                                    {order.address.street ? `${order.address.street}, ` : ''}
                                                    {order.address.city ? `${order.address.city}, ` : ''}
                                                    {order.address.state ? `${order.address.state}, ` : ''}
                                                    {order.address.country ? `${order.address.country} ` : ''}
                                                    {order.address.zipcode ? order.address.zipcode : ''}
                                                </p>
                                            ) : (
                                                <p className="text-gray-500">No address information available</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h3 className="font-bold text-lg mb-2">Products</h3>
                                        {order.productIds && order.productIds.length > 0 ? (
                                            <ul className="bg-gray-50 p-3 rounded-md">
                                                {order.productIds.map((productId) => (
                                                    <li key={productId} className="text-gray-700 py-1 border-b last:border-b-0">
                                                        {productId}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">No products found</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default OrderPage