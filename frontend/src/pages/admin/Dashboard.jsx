import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';
import { FaBook, FaShoppingCart, FaUsers, FaChartLine, FaPlus, FaList, FaBoxOpen } from 'react-icons/fa';
import Loading from '../../components/Loading';

const DashboardCard = ({ title, value, icon, color, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6 flex items-center`}>
    <div className={`${color} rounded-full p-3 mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const QuickLinkCard = ({ title, description, icon, to, color }) => (
  <Link to={to} className="block">
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className={`${color} rounded-full p-3 inline-block mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const RecentActivityItem = ({ title, time, status, statusColor }) => (
  <div className="py-3 border-b border-gray-200 last:border-b-0">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
        {status}
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: [],
    recentBooks: [],
    monthlyRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // This would ideally be a single API call to get all dashboard data
        // For now, we'll simulate with static data
        
        // Simulated data - in a real app, this would come from the API
        setTimeout(() => {
          setDashboardData({
            totalBooks: 124,
            totalOrders: 38,
            totalUsers: 256,
            monthlyRevenue: 4280,
            recentOrders: [
              { id: 'ORD-1234', customer: 'Susant Rai', date: '2 hours ago', status: 'Delivered', statusColor: 'bg-green-100 text-green-800' },
              { id: 'ORD-1233', customer: 'Ram Khatri', date: '5 hours ago', status: 'Processing', statusColor: 'bg-blue-100 text-blue-800' },
              { id: 'ORD-1232', customer: 'Deepak Rana', date: '1 day ago', status: 'Shipped', statusColor: 'bg-purple-100 text-purple-800' },
              { id: 'ORD-1231', customer: 'Tejendra Magar', date: '2 days ago', status: 'Delivered', statusColor: 'bg-green-100 text-green-800' },
            ],
            recentBooks: [
              { id: 'BK-789', title: 'Seto Dharti', date: '1 day ago', status: 'In Stock' },
              { id: 'BK-788', title: 'Muna Madan', date: '2 days ago', status: 'In Stock' },
              { id: 'BK-787', title: 'Journey to the Stars', date: '3 days ago', status: 'Low Stock' },
            ]
          });
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Books Heaven Admin</h2>
        <p className="text-gray-600">
          Manage your books, orders, and more from this dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Books" 
          value={dashboardData.totalBooks} 
          icon={<FaBook className="h-6 w-6" />} 
          color="bg-blue-100 text-blue-600" 
          bgColor="bg-white" 
        />
        <DashboardCard 
          title="Total Orders" 
          value={dashboardData.totalOrders} 
          icon={<FaShoppingCart className="h-6 w-6" />} 
          color="bg-green-100 text-green-600" 
          bgColor="bg-white" 
        />
        <DashboardCard 
          title="Total Users" 
          value={dashboardData.totalUsers} 
          icon={<FaUsers className="h-6 w-6" />} 
          color="bg-purple-100 text-purple-600" 
          bgColor="bg-white" 
        />
        <DashboardCard 
          title="Monthly Revenue" 
          value={`$${dashboardData.monthlyRevenue}`} 
          icon={<FaChartLine className="h-6 w-6" />} 
          color="bg-yellow-100 text-yellow-600" 
          bgColor="bg-white" 
        />
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickLinkCard 
            title="Add New Book" 
            description="Add a new book to your inventory" 
            icon={<FaPlus className="h-5 w-5 text-white" />} 
            to="/dashboard/add-new-book" 
            color="bg-blue-600"
          />
          <QuickLinkCard 
            title="Manage Books" 
            description="View and edit your book inventory" 
            icon={<FaBook className="h-5 w-5 text-white" />} 
            to="/dashboard/manage-books" 
            color="bg-purple-600"
          />
          <QuickLinkCard 
            title="Manage Orders" 
            description="View and process customer orders" 
            icon={<FaShoppingCart className="h-5 w-5 text-white" />} 
            to="/dashboard/manage-orders" 
            color="bg-green-600"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <Link to="/dashboard/manage-orders" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-1">
            {dashboardData.recentOrders.map((order, index) => (
              <RecentActivityItem 
                key={index}
                title={`${order.id} - ${order.customer}`}
                time={order.date}
                status={order.status}
                statusColor={order.statusColor}
              />
            ))}
          </div>
        </div>

        {/* Recently Added Books */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recently Added Books</h2>
            <Link to="/dashboard/manage-books" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-1">
            {dashboardData.recentBooks.map((book, index) => (
              <RecentActivityItem 
                key={index}
                title={`${book.id} - ${book.title}`}
                time={book.date}
                status={book.status}
                statusColor="bg-blue-100 text-blue-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;