import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: '/admin/all',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            providesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/admin/${orderId}/status`,
                method: 'PATCH',
                body: { status },
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            invalidatesTags: ['Orders']
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation
} = ordersApi;

export default ordersApi;