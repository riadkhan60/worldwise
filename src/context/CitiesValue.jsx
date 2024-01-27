import { CitiesContext } from "./CitiesContext";
import { useContext } from "react";

function useCitiesValue() {
  const contextValue = useContext(CitiesContext);
  if (contextValue === undefined)
    throw new Error('can not use outside of cities context');
  return contextValue;
}

export default useCitiesValue;