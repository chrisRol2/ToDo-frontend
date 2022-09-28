import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
     &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f5;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 90px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  :root{
    --fullscreen_heigth: calc(100vh - 60px);
   
  }
`;
