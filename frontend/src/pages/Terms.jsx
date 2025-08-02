import React from 'react';
import CopyrightNotice from '../components/CopyrightNotice';

const Terms = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700">
          By accessing and using BookStore's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
        <p className="mb-4 text-gray-700">
          BookStore reserves the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
        <p className="mb-4 text-gray-700">
          To access certain features of our website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
        <p className="mb-4 text-gray-700">
          You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current. BookStore reserves the right to suspend or terminate accounts that contain false or outdated information, or that are used for fraudulent activities.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Ordering and Payments</h2>
        <p className="mb-4 text-gray-700">
          All orders placed through our website are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or identification of fraudulent activity.
        </p>
        <p className="mb-4 text-gray-700">
          Prices for products are subject to change without notice. We make every effort to display accurate pricing information, but we do not guarantee that all information on our website is error-free. In the event of a pricing error, we reserve the right to cancel the order and refund any payment made.
        </p>
        <p className="mb-4 text-gray-700">
          Payment must be received in full before an order is processed and shipped. We accept various payment methods as indicated on our website.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Shipping and Returns</h2>
        <p className="mb-4 text-gray-700">
          Shipping times and costs vary depending on location and shipping method selected. We are not responsible for delays caused by customs, postal services, or other circumstances beyond our control.
        </p>
        <p className="mb-4 text-gray-700">
          Returns are accepted within 30 days of receipt for products in their original condition. Please refer to our Returns Policy for detailed information on the return process.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
        <p className="mb-4 text-gray-700">
          All content on our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of BookStore or its content suppliers and is protected by international copyright laws.
        </p>
        <p className="mb-4 text-gray-700">
          You may not use, reproduce, distribute, modify, or create derivative works from any content on our website without our express written permission.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. User Conduct</h2>
        <p className="mb-4 text-gray-700">
          You agree not to use our website for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. This includes but is not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">Engaging in any activity that constitutes or encourages criminal conduct</li>
          <li className="mb-2">Attempting to interfere with the proper functioning of our website</li>
          <li className="mb-2">Using automated means to access or collect data from our website without our prior consent</li>
          <li className="mb-2">Impersonating another person or entity</li>
          <li className="mb-2">Posting content that is defamatory, obscene, or otherwise objectionable</li>
        </ul>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700">
          BookStore provides its website and services "as is" and makes no representations or warranties of any kind, express or implied, regarding the operation of our website or the information, content, materials, or products included on our website.
        </p>
        <p className="mb-4 text-gray-700">
          To the fullest extent permissible by law, BookStore disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. BookStore will not be liable for any damages arising from the use of our website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p className="mb-4 text-gray-700">
          These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
        </p>
        <p className="mb-4 text-gray-700">
          Any dispute arising under or relating to these Terms of Service shall be resolved exclusively in the courts of [Your Jurisdiction].
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
        <p className="mb-4 text-gray-700">
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </p>
        <p className="text-gray-700">
            Contact: +977 9849533661
            </p>
            <p className="text-gray-700">
            Email: <a href="mailto:terms@bookstore.com" className="text-blue-600 hover:underline">terms@bookstore.com</a></p>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600">Last Updated: January {currentYear}</p>
        <CopyrightNotice className="mt-2 text-center" />
      </div>
    </div>
  );
};

export default Terms; 