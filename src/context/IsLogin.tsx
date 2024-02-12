import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

type IsLoginContextProps = {
  isUserLogin: boolean | null;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type IsLoginContextProviderProps = {
  children: React.ReactNode;
};

const IsLoginContext = createContext<IsLoginContextProps>(
  {} as IsLoginContextProps
);

const IsLoginContextProvider = ({ children }: IsLoginContextProviderProps) => {
  const [cookies] = useCookies(["token"]);
  const [isUserLogin, setIsUserLogin] = useState<boolean | null>(
    !!cookies.token
  );

  return (
    <IsLoginContext.Provider value={{ isUserLogin, setIsUserLogin }}>
      {children}
    </IsLoginContext.Provider>
  );
};

const useIsUserLogin = () => {
  return useContext(IsLoginContext);
};

export { IsLoginContextProvider, useIsUserLogin };
