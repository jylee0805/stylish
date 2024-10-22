import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { AppProvider } from "./AppContextProvider";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import CheckoutPage from "./page/CheckoutPage";
import MemberPage from "./page/MemberPage";
import ProductPage from "./page/ProductPage";
import ThanksPage from "./page/ThanksPage";
import GlobalStyle from "./style/GlobalStyle";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  margin-bottom: 19px;
  min-height: calc(100vh - 330px);
  margin-top: 191px;
  @media (max-width: 1279.9px) {
    max-width: 100vw;
    margin: 102px auto 12px;
  }
`;
const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <GlobalStyle />
        <Wrap>
          <Header />
          <Main>
            <Routes>
              <Route path="/product" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/member" element={<MemberPage />} />
              <Route path="/thanks" element={<ThanksPage />} />
            </Routes>
          </Main>
          <Footer />
        </Wrap>
      </div>
    </AppProvider>
  );
};

export default App;
