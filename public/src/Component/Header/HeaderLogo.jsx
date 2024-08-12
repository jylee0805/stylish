import styled from "styled-components";
import logo from "./img/logo.png";

const Logo = styled.a`
  display: block;
  width: 258px;
  height: 48px;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
  white-space: nowrap;
  text-indent: 101%;
  overflow: hidden;

  @media (max-width: 1279.9px) {
    width: 129px;
    height: 24px;
    margin: 0 auto;
  }
`;
const LogoBox = styled.div`
  @media (max-width: 1279.9px) {
    padding: 14px 16px;
  }
`;

const HeaderLogo = () => {
  return (
    <LogoBox>
      <Logo href="homePage.html">STYLiSH</Logo>
    </LogoBox>
  );
};
export default HeaderLogo;
