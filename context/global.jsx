import RecordsContextProvider from "./record";
const jwt = require("jsonwebtoken");

const { createContext } = require("react");

export const GlobalContext = createContext({});

export default function GlobalContextProvider({
  children,
  cookies,
  location,
  salt,
}) {
  console.log(jwt.verify(cookies?.lpbBID, salt));

  return (
    <GlobalContext.Provider value={{ cookies: cookies, location: location }}>
      <RecordsContextProvider>{children}</RecordsContextProvider>
    </GlobalContext.Provider>
  );
}
