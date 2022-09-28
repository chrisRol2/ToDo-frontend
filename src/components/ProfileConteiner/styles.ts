import styled from "styled-components";

const Aside = styled.aside`
  height: 70%;
  aspect-ratio: 4/3;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  padding: 20px;

  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
`;

const UserImg = styled.img`
  aspect-ratio: 1;
  height: 10rem;
  border-radius: 50%;
  border: 2px solid #777;
  padding: 2px;
`;

const Username = styled.h2`
  &:first-letter {
    text-transform: uppercase;
  }
`;

const Describe = styled.p`
  width: 50%;
`;

const UserData = styled.div`
  width: 100%;
  /* background-color: red; */
  padding: 0;
  margin-top: -5rem;
  /* outline: 1px solid black; */
  padding-left: 10%;
  & > div {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    /* outline: 1px solid black; */
    width: 11rem;
  }
`;

export { Aside, UserImg, Username, Describe, UserData };
