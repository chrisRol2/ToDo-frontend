import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../context/account/account";
import { Login as LogForm, LoginContainer } from "./styles";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const { login, account } = useContext(AccountContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (account) {
      setLoginStatus("You are already logged in");
      navigate("/dashboard");
      console.log("You are already logged in");
    }
  }, [account, navigate]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!account) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username?.value,
          password: e.target.password?.value,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setLoginStatus("success");
        login(data);
      }
      if (data.status !== "success") {
        setLoginStatus("Password or username is incorrect");
      }
    }
  };
  return (
    <LoginContainer>
      <LogForm>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Login</button>
          <div>
            <p>{loginStatus}</p>
          </div>
        </form>
      </LogForm>
    </LoginContainer>
  );
};

export default Login;
