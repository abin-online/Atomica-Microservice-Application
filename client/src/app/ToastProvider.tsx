'use client';

import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Provider;
