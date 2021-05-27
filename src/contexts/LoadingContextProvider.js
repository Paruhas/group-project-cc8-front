import { createContext, useState } from "react";

export const IsLoadingContext = createContext();

function IsLoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const ClearLoading = () => {
    setIsLoading(false);
  };

  return (
    <IsLoadingContext.Provider
      value={{ isLoading, setIsLoading, ClearLoading }}
    >
      {children}
    </IsLoadingContext.Provider>
  );
}

export default IsLoadingProvider;
