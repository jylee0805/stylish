import styled from "styled-components";
import FooterMenu from "./FooterMenu";
import FooterSocial from "./FooterSocial";

const FooterContainer = styled.footer`
  background: #313538;
  width: 100vw;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 33px 0px 32px 10px;
  align-items: center;
  flex-wrap: wrap;
  width: 100vw;

  @media (max-width: 1279.9px) {
    max-width: 480px;
    padding: 23px 85px 20px 102px;
    align-items: start;
    margin: 0 auto 60px;
  }
  @media (max-width: 479px) {
    padding: 23px 32px 20px 42px;
  }
`;

const CopyRight = styled.small`
  color: #828282;
  font-size: 12px;
  line-height: 17.38px;
  text-align: center;

  @media (max-width: 1279.9px) {
    font-size: 10px;
    margin-left: -10px;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <nav>
          <FooterMenu />
        </nav>
        <nav>
          <FooterSocial />
        </nav>
        <CopyRight>© 2018. All rights reserved.</CopyRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
