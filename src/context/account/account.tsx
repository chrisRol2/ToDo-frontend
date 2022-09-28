// react login context

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext<any>(null);

const Account = ({ children }: any) => {
  const [account, setAccount] = useState<any>(null);
  const history = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }
  }, []);

  const getUser = () => {
    return account.account;
  };

  const login = (account: any) => {
    setAccount(account);
    localStorage.setItem("account", JSON.stringify(account));
    history("/dashboard");
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem("account");
    history("/");
  };

  const getToken = () => {
    return account ? account.account.accessToken : "";
  };

  return (
    <AccountContext.Provider
      value={{ account, login, logout, getToken, getUser }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default Account;
