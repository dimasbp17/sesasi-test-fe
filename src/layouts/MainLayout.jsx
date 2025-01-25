import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow px-4 md:px-10 lg:px-20">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
