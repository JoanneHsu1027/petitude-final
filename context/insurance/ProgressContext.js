import React, { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export 
  const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </ProgressContext.Provider>
  );
};

