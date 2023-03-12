const { createContext } = require("react");

export const RecordsContext = createContext({});

export default function RecordsContextProvider({ children }) {
  return (
    <RecordsContext.Provider value={{}}>{children}</RecordsContext.Provider>
  );
}
