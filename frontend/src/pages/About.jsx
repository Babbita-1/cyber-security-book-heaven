import React from 'react';
import { Link } from 'react-router-dom';
import CopyrightNotice from '../components/CopyrightNotice';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Books Heaven</h1>
      
      {/* Mission Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Our Mission</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          At Books Heaven, our mission is to connect readers with the books they love and introduce them to new worlds they haven't yet discovered. 
          We believe that books have the power to transform lives, spark imagination, and foster empathy.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We're committed to making quality literature accessible to everyone, supporting authors and publishers, 
          and creating a community where book lovers can share their passion for reading.
        </p>
      </div>
      
      {/* Our Story Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Our Story</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <p className="mb-4 text-gray-700 leading-relaxed">
              Books Heaven began in 2020 as a small website with a passion for books and a vision to create 
              a modern digital bookstore that offers the personal touch of a neighborhood bookshop.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              What started as a modest collection of bestsellers has grown into a comprehensive library spanning 
              countless genres, from timeless classics to cutting-edge contemporary works, technical manuals to 
              imaginative fiction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through my journey, I've remained committed to my founding principles: exceptional customer service, 
              thoughtfully curated selections, and fostering a love of reading in our community.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Books in our collection</div>
              <div className="text-5xl font-bold text-indigo-600 mt-6 mb-2">1K+</div>
              <div className="text-gray-600">Happy customers</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Team Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Tejendra Magar</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="text-sm text-gray-500 mt-2">Book lover with 15+ years in publishing</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Deepak Rana</h3>
            <p className="text-gray-600">Head of Curation</p>
            <p className="text-sm text-gray-500 mt-2">Former librarian and literary critic</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Susil Tamang</h3>
            <p className="text-gray-600">Customer Experience</p>
            <p className="text-sm text-gray-500 mt-2">Passionate about connecting readers with their perfect book</p>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Quality Over Quantity</h3>
            <p className="text-gray-700">
              We carefully select each title in our collection to ensure we offer only the best reading experiences.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
            <p className="text-gray-700">
              We believe everyone should have access to great books, regardless of location or circumstances.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Community</h3>
            <p className="text-gray-700">
              We foster connections between readers, authors, and publishers to create a energetic literary ecosystem.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Innovation</h3>
            <p className="text-gray-700">
              We embrace new technologies and approaches to enhance the book discovery and reading experience.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Get in Touch</h2>
        <p className="mb-6 text-gray-700">
          We'd love to hear from you! Whether you have questions about our selection, need recommendations, 
          or want to collaborate, our team is here to help.
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-700">Email: <a href="magartej728@gmail.com" className="text-indigo-600 hover:underline">contact@bookstore.com</a></p>
            <p className="text-gray-700">Phone: (+977) 9849533661</p>
          </div>
          <div>
            <Link to="/books" className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">
              Explore Our Collection
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <CopyrightNotice className="text-center" />
      </div>
    </div>
  );
};

export default About; 