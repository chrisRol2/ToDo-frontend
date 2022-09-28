import styled from "styled-components";
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  /* background-color: #33f; */
  background-color: #e5e5f7;
  opacity: 1;
  background-image: radial-gradient(
      circle at center center,
      #4427ff44,
      #e5e5f744
    ),
    repeating-radial-gradient(
      circle at center center,
      #4427ff33,
      #4427ff33,
      10px,
      transparent 20px,
      transparent 10px
    );
  background-blend-mode: multiply;
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  & > form {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > input {
      margin: 10px 0;
      width: 300px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 0 10px;
    }
    & > button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #33f;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        background-color: #22d;
      }
    }
  }
`;
const Main = styled.main`
  height: 100vh;
  width: 100%;
`;

export { LoginContainer, Login, Main };
