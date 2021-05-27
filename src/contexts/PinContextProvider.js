import { createContext, useState } from "react";

export const PinContext = createContext();

function PinProvider({ children }) {
  const [pin, setPin] = useState([]);
  const [pinTrigger, setPinTrigger] = useState(false);

  return (
    <PinContext.Provider value={{ pin, setPin, pinTrigger, setPinTrigger }}>
      {children}
    </PinContext.Provider>
  );
}

export default PinProvider;
