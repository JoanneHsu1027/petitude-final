import React from 'react';
import { ProgressProvider } from '@/contexts/insurance/ProgressContext';


export default function withProgressBar(WrappedComponent) {
  return function WithProgressBar(props) {
    return (
      <ProgressProvider>
        <WrappedComponent {...props} />
      </ProgressProvider>
    );
  };
}