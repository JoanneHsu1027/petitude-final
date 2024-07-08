import React from 'react';
import { ProgressProvider } from '@/context/insurance/progressContext';

export default function withProgressBar(WrappedComponent) {
  return function WithProgressBar(props) {
    return (
      <ProgressProvider>
        <WrappedComponent {...props} />
      </ProgressProvider>
    );
  };
}