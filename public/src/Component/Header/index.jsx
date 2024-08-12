import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import HeaderCategories from "./HeaderCategories";
import HeaderFeature from "./HeaderFeature";

const HeaderContainer = styled.header`
  display: flex;
  border-bottom: 40px solid #313538;
  padding: 26px 54px 26px 60px;
  align-items: end;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;
  background: #fff;

  @media (max-width: 1279.9px) {
    display: block;
    border: 0;
    padding: 0;
  }
`;

const Header = ({ cartNum, profileImg }) => {
  return (
    <HeaderContainer>
      <HeaderLogo />
      <nav>
        <HeaderCategories />
      </nav>
      <HeaderFeature cartNum={cartNum} profileImg={profileImg} />
    </HeaderContainer>
  );
};
export default Header;
