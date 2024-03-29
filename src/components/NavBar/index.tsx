import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/account/account";
import defaultImg from "./defaultImage";
import { Button, Img, NameLogo, NavBarContainer, NavLink } from "./syles";
const NavBar = () => {
  const { logout, account } = useContext(AccountContext);

  return (
    <NavBarContainer>
      <NameLogo>CRUD</NameLogo>
      {account ? (
        <div>
          <Button onClick={logout}>Logout</Button>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <span>{account?.username}</span>
          <Img src={account?.img ? account?.img : defaultImg} alt="" />
        </div>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
