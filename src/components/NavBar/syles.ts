import { Link } from "react-router-dom";
import styled from "styled-components";
const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff55;
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  /* width: 100%; */
  z-index: 1;
  padding: 0 2rem;
  margin: 0;
  backdrop-filter: blur(10px);
  & > div {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    outline: 10px solid red;
  }
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 40px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 20px;
`;

const NameLogo = styled.span`
  color: #4427ff;
  font-weight: 600;
  font-size: 1.8rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 1.2rem;
  margin: 0 20px;
`;

export { Button, Img, NameLogo, NavBarContainer, NavLink };
