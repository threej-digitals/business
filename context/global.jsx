import { BusinessContextProvider } from "./businessContext";

const { createContext } = require("react");

export const GlobalContext = createContext({});

export default function GlobalContextProvider({ children, cookies, location }) {
  return (
    <GlobalContext.Provider value={{ cookies: cookies, location: location }}>
      <BusinessContextProvider location={location}>
        {children}
      </BusinessContextProvider>
    </GlobalContext.Provider>
  );
}
