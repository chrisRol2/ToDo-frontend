import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: var(--fullscreen_heigth);
  width: 100%;
  background: #f0f0f5;
`;
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  padding: 32px 0;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  & > h1 {
    font-size: 2rem;
    /* outline: 1px solid #000; */
    flex-basis: 0;
    height: 3rem;
  }

  & > ul {
    flex-grow: 1;
    background: #f0f0f5;
    /* background-color: #099; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 70%;
    /* height: 100%; */
    padding: 10px 32px;
    /* outline: 2px solid red; */
    overflow-y: auto;

    & > li {
      list-style: none;
      margin: 8px 0;
      padding: 8px;
      background-color: #fff;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span {
        font-size: 1.2rem;
        font-weight: 500;
        color: #3d3d4d;
      }
      & > div {
        display: flex;
        align-items: center;
        gap: 1rem;
        & > button {
          background: transparent;
          border: 0;
          font-size: 1.2rem;
          font-weight: 900;
          color: #a8a8b3;
          transition: color 0.2s;
          &:hover {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
    & > li > form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 1rem;
      & > div {
        display: flex;
        align-items: center;
        gap: 1rem;
        & > button {
          background: transparent;
          border: 0;
          font-size: 1.2rem;
          font-weight: 900;
          color: #a8a8b3;
          transition: color 0.2s;
          &:hover {
            color: #666;
            cursor: pointer;
          }
        }
      }
      & > input {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid #a8a8b3;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: 500;
        color: #3d3d4d;
        &::placeholder {
          color: #a8a8b3;
        }
      }
    }
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 3rem;
  width: 80%;

  & > h1 {
    font-size: 2rem;
    color: #3a3a3a;
  }
  & > button {
    background: transparent;
    border: 0;
    font-size: 1.6rem;
    font-weight: 900;
    color: #a8a8b3;
    opacity: 1;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

export { Main, DashboardContainer, Header };
