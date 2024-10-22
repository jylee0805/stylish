import styled from "styled-components";
import facebook from "./img/facebook.png";
import line from "./img/line.png";
import twitter from "./img/twitter.png";

const Container = styled.ul`
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
const Link = styled.ul`
  display: block;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 1279.9px) {
    width: 20px;
    height: 20px;
  }
`;
const Social = () => {
  return (
    <Container>
      <li>
        <Link href="#">
          <Img src={line} alt="line-icon" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <Img src={twitter} alt="twitter-icon" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <Img src={facebook} alt="facebook-icon" />
        </Link>
      </li>
    </Container>
  );
};
export default Social;
