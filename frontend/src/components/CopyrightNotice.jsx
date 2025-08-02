import React from 'react';
import { Link } from 'react-router-dom';

const CopyrightNotice = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className={`text-sm text-gray-500 ${className}`}>
      <p>
        &copy; {currentYear} BookStore. All rights reserved.
        <Link to="/copyright" className="ml-1 text-blue-500 hover:underline">
          Copyright Information
        </Link>
      </p>
    </div>
  );
};

export default CopyrightNotice; 