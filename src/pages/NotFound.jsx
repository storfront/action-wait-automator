
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <a href="/" className="text-blue-500 hover:underline">
        Return to home page
      </a>
    </div>
  );
};

export default NotFound;
