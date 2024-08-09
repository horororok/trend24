import { createContext, ReactNode } from 'react';
import { useState } from 'react';



interface TransitionContextType {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
}

const defaultContextValue: TransitionContextType = {
  completed: false,
  toggleCompleted: () => {},
};

const TransitionContext = createContext(defaultContextValue);

export const TransitionProvider = ({ children }: {children: ReactNode }) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value:boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
