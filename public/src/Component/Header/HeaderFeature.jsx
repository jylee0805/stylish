import styled from "styled-components";
import HeaderCart from "./HeaderCart";
import HeaderMember from "./HeaderMember";
import HeaderSearch from "./HeaderSearch";

const Feature = styled.div`
  display: flex;
  column-gap: 42px;
  margin-left: auto;
`;

const FeatureBox = styled.div`
  display: flex;
  gap: 42px;

  @media (max-width: 1279.9px) {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6px 0 8px;
    gap: 0;
    background: #313538;
  }
`;

const HeaderFeature = ({ cartNum, profileImg }) => {
  return (
    <Feature>
      <HeaderSearch />
      <FeatureBox>
        <HeaderCart cartNum={cartNum} />
        <HeaderMember profileImg={profileImg} />
      </FeatureBox>
    </Feature>
  );
};
export default HeaderFeature;
