import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff55;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  padding: 0;
  margin: 0;
  backdrop-filter: blur(10px);
`;

const NavBar = () => {
  return <NavBarContainer>NavBar</NavBarContainer>;
};

export default NavBar;
