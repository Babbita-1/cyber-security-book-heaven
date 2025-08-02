import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiViewGridAdd, HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineManageHistory, MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart, FaBook, FaUserShield } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import Loading from '../../components/Loading';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ username: "Admin" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const username = localStorage.getItem('adminUsername');
    if (username) {
      setAdminInfo({ username });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUsername');
    navigate("/admin");
  };

  if (loading) {
    return <Loading />;
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <section className="flex bg-gray-100 min-h-screen">
      {/* Sidebar for desktop */}
      <aside className={`bg-gray-900 text-white w-64 min-h-screen p-4 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FaBook className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold ml-3">BookStore Admin</span>
          </div>
          <button 
            className="md:hidden rounded-md p-2 hover:bg-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BiMenuAltLeft className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center p-3 bg-gray-800 rounded-lg">
            <FaUserShield className="h-6 w-6 text-blue-400" />
            <div className="ml-3">
              <p className="text-sm font-medium">Welcome,</p>
              <p className="text-sm font-bold">{adminInfo.username}</p>
            </div>
          </div>
        </div>
        
        <nav className="space-y-2">
          <Link 
            to="/dashboard" 
            className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <MdOutlineDashboard className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/dashboard/manage-books" 
            className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard/manage-books') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <MdOutlineManageHistory className="h-5 w-5 mr-3" />
            <span>Manage Books</span>
          </Link>
          
          <Link 
            to="/dashboard/add-new-book" 
            className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard/add-new-book') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <HiViewGridAdd className="h-5 w-5 mr-3" />
            <span>Add New Book</span>
          </Link>
          
          <Link 
            to="/dashboard/manage-orders" 
            className={`flex items-center py-3 px-4 rounded-lg transition-colors ${isActive('/dashboard/manage-orders') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          >
            <FaShoppingCart className="h-5 w-5 mr-3" />
            <span>Manage Orders</span>
          </Link>
          
          <div className="pt-8">
            <Link 
              to="/" 
              className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <HiOutlineHome className="h-5 w-5 mr-3" />
              <span>Visit Store</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-left"
            >
              <HiOutlineLogout className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <BiMenuAltLeft className="h-6 w-6" />
              </button>
              <h2 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">
                {location.pathname === '/dashboard' && 'Dashboard Overview'}
                {location.pathname === '/dashboard/manage-books' && 'Manage Books'}
                {location.pathname === '/dashboard/add-new-book' && 'Add New Book'}
                {location.pathname === '/dashboard/manage-orders' && 'Manage Orders'}
                {location.pathname.includes('/dashboard/edit-book') && 'Edit Book'}
              </h2>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <span className="font-medium text-gray-700">{adminInfo.username}</span>
                  <FaUserShield className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;