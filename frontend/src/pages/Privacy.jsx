import React from 'react';
import CopyrightNotice from '../components/CopyrightNotice';

const Privacy = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4 text-gray-700">
          At BookStore, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>
        <p className="mb-4 text-gray-700">
          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us.
        </p>
        <p className="mb-4 text-gray-700">
          The personal information we collect may include:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">Name</li>
          <li className="mb-2">Email address</li>
          <li className="mb-2">Mailing address</li>
          <li className="mb-2">Phone number</li>
          <li className="mb-2">Payment information</li>
          <li className="mb-2">Purchase history</li>
        </ul>
        <p className="mb-4 text-gray-700">
          We also automatically collect certain information when you visit our website, including:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">IP address</li>
          <li className="mb-2">Browser type</li>
          <li className="mb-2">Operating system</li>
          <li className="mb-2">Pages visited</li>
          <li className="mb-2">Time and date of your visit</li>
          <li className="mb-2">Referring website</li>
        </ul>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">
          We may use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">Processing and fulfilling your orders</li>
          <li className="mb-2">Sending you order confirmations and updates</li>
          <li className="mb-2">Responding to your inquiries and customer service requests</li>
          <li className="mb-2">Sending you marketing communications (with your consent)</li>
          <li className="mb-2">Improving our website and services</li>
          <li className="mb-2">Analyzing usage patterns and trends</li>
          <li className="mb-2">Protecting against fraud and unauthorized transactions</li>
          <li className="mb-2">Complying with legal obligations</li>
        </ul>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
        <p className="mb-4 text-gray-700">
          We may share your information with:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">Service providers who assist us in operating our website and conducting our business (such as payment processors, shipping companies, and marketing partners)</li>
          <li className="mb-2">Legal authorities when required by law or to protect our rights</li>
          <li className="mb-2">Business partners in the event of a merger, acquisition, or sale of all or a portion of our assets</li>
        </ul>
        <p className="mb-4 text-gray-700">
          We do not sell, rent, or trade your personal information with third parties for their marketing purposes without your explicit consent.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
        <p className="mb-4 text-gray-700">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        </p>
        <p className="mb-4 text-gray-700">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4 text-gray-700">
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be entirely secure, and we cannot guarantee absolute security.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
        <p className="mb-4 text-gray-700">
          Depending on your location, you may have certain rights regarding your personal information, such as:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">The right to access personal information we hold about you</li>
          <li className="mb-2">The right to request correction of inaccurate information</li>
          <li className="mb-2">The right to request deletion of your personal information</li>
          <li className="mb-2">The right to withdraw consent for processing your information</li>
          <li className="mb-2">The right to opt-out of marketing communications</li>
        </ul>
        <p className="mb-4 text-gray-700">
          To exercise these rights, please contact us using the information provided below.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
        <p className="mb-4 text-gray-700">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4 text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-gray-700">
            Contact: +977 9849533661    
            </p>
            <p className='text-gray-700'>
            Email: <a href="mailto:privacy@bookstore.com" className="text-blue-600 hover:underline">privacy@bookstore.com</a></p>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600">Last Updated: January {currentYear}</p>
        <CopyrightNotice className="mt-2 text-center" />
      </div>
    </div>
  );
};

export default Privacy; 