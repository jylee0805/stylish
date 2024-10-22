import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 57px;

  @media (max-width: 1279.9px) {
    justify-content: space-around;
    background: #313538;
    padding: 0;
  }
`;

const Item = styled.li`
  position: relative;

  @media (max-width: 1279.9px) {
    flex-grow: 1;
  }
`;

const Link = styled.a`
  padding: 0 10px 0 40px;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 30px;

  ${Item} + ${Item} > &::before {
    content: "";
    height: 20px;
    width: 1px;
    background: #3f3a3a;
    position: absolute;
    top: 5px;
    left: 0;
    @media (max-width: 1279.9px) {
      background: #808080;
      top: 17px;
    }
  }

  ${Item}:hover & {
    color: #8b572a;
    @media (max-width: 1279.9px) {
      color: #fff;
    }
  }

  @media (max-width: 1279.9px) {
    display: block;
    letter-spacing: 0;
    font-size: 16px;
    line-height: 16px;
    color: #828282;
    padding: 17px;
  }
`;

const Categories = () => {
  return (
    <Container>
      <Item>
        <Link href="./homePage.html?category=women">女裝</Link>
      </Item>
      <Item>
        <Link href="./homePage.html?category=men">男裝</Link>
      </Item>
      <Item>
        <Link href="./homePage.html?category=accessories">配件</Link>
      </Item>
    </Container>
  );
};
export default Categories;
