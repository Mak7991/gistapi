import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from "./components/GistList";

const App = () => {
  const [userSearch, setUserSearch] = useState("");
  return (
    <Wrapper className="App" data-testid="app">
      <Header setUserSearch={setUserSearch} />
      <GistList userSearch={userSearch} />
      <GlobalStyles />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
