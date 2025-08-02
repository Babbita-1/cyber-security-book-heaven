import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await axios.get(`${getBaseUrl()}/api/auth/verify-admin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          // If token exists but is not valid for admin
          localStorage.removeItem("token");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        localStorage.removeItem("token");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminRoute;
