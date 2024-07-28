// src/components/LoadingPage.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ClipLoader size={150} color={"#123abc"} loading={true} />
    </div>
  );
};

export default LoadingComponent;
