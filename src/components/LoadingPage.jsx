import { CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-28">
        <CircularProgress />
        <h3 className="text-lg text-gray-700 font-poppins">Loading...</h3>
      </div>
    </>
  );
};

export default LoadingPage;
