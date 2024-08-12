import styled from "styled-components";
import facebook from "./img/facebook.png";
import twitter from "./img/twitter.png";
import line from "./img/line.png";

const Social = styled.ul`
  display: flex;
  column-gap: 30px;
  margin-left: 101px;
  margin-right: 30px;

  @media (max-width: 1279.9px) {
    column-gap: 14px;
    margin-left: 31px;
    margin-right: 0;
    align-self: start;
    margin-top: 18px;
  }
`;
const SocialLink = styled.ul`
  display: block;
`;
const SocialImg = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 1279.9px) {
    width: 20px;
    height: 20px;
  }
`;
const FooterSocial = () => {
  return (
    <Social>
      <li>
        <SocialLink href="#">
          <SocialImg src={line} alt="line-icon" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="#">
          <SocialImg src={twitter} alt="twitter-icon" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="#">
          <SocialImg src={facebook} alt="facebook-icon" />
        </SocialLink>
      </li>
    </Social>
  );
};
export default FooterSocial;
