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
    } else {
      history("/");
    }
  }, [history]);

  const getUser = () => {
    return account;
  };

  const login = (account: any) => {
    setAccount(account);
    localStorage.setItem(
      "account",
      JSON.stringify({ img: account.img, username: account.username })
    );
    localStorage.setItem("accessToken", account.accessToken);
    localStorage.setItem("refreshToken", account.refreshToken);

    history("/dashboard");
  };

  const logout = () => {
    setAccount(null);
    localStorage.clear();
    history("/");
  };

  const getToken = () => {
    const token = localStorage.getItem("accessToken");

    return token;
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
