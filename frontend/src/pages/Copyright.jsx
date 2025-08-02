import React from 'react';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Copyright Information</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Copyright Notice</h2>
        <p className="mb-4">
          &copy; {currentYear} Books Heaven. All rights reserved.
        </p>
        <p className="mb-4">
          All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Books Heaven or its content suppliers and is protected by international copyright laws.
        </p>
        <p className="mb-4">
          The compilation of all content on this site is the exclusive property of Books Heaven and is protected by international copyright laws.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Book Content Copyright</h2>
        <p className="mb-4">
          All book covers, descriptions, and content displayed on this website are copyright of their respective publishers and authors. Books Heaven does not claim ownership of any such material.
        </p>
        <p className="mb-4">
          The display of such material on our website is for informational and commercial purposes only, under fair use principles, and we make every effort to provide proper attribution.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Content</h2>
        <p className="mb-4">
          By posting reviews, comments, or other content on our website, you grant Books Heaven a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
        </p>
        <p className="mb-4">
          You represent and warrant that you own or otherwise control all of the rights to the content that you post; that the content is accurate; that use of the content you supply does not violate this policy and will not cause injury to any person or entity.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Copyright Infringement</h2>
        <p className="mb-4">
          Books Heaven respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest</li>
          <li className="mb-2">A description of the copyrighted work that you claim has been infringed upon</li>
          <li className="mb-2">A description of where the material that you claim is infringing is located on the site</li>
          <li className="mb-2">Your address, telephone number, and e-mail address</li>
          <li className="mb-2">A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
          <li className="mb-2">A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf</li>
        </ul>
      </div>
    </div>
  );
};

export default Copyright; 