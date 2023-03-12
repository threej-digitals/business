import RecordsContextProvider from "./record";

const { createContext } = require("react");

export const GlobalContext = createContext({});

export default function GlobalContextProvider({ children, cookies, location }) {
  return (
    <GlobalContext.Provider value={{ cookies: cookies, location: location }}>
      <RecordsContextProvider>{children}</RecordsContextProvider>
    </GlobalContext.Provider>
  );
}
