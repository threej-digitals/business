import Cookies from "js-cookie";
import { useRouter } from "next/router";

const { createContext, useEffect, useState } = require("react");

export const BusinessContext = createContext({});

export function BusinessContextProvider({ children, location }) {
  const [business, setBusinessDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("lpbBID")) {
      fetch(location.base + "/api/business?token=" + Cookies.get("lpbBID"))
        .then((response) => response.json())
        .then((data) => {
          setBusinessDetails(data);
        });
    } else if (!/login\/?$/.test(location.href)) {
      router.push("/");
    }
  }, []);

  return (
    <BusinessContext.Provider value={{ detail: business }}>
      {children}
    </BusinessContext.Provider>
  );
}
