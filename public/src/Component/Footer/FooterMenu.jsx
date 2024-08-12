import styled from "styled-components";

const Menu = styled.ul`
  display: flex;
  margin-left: -10px;
  margin-top: -2px;

  @media (max-width: 1279.9px) {
    height: 76px;
    column-gap: 36px;
    row-gap: 8.5px;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 10px;
    align-items: flex-start;
    margin-top: 1px;
  }
`;
const MenuItem = styled.li`
  position: relative;
`;
const MenuLink = styled.a`
  display: block;
  width: 134px;
  color: #f5f5f5;
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  ${MenuItem} + li > &::before {
    content: "";
    height: 16px;
    width: 1px;
    background: #f3f3f3;
    position: absolute;
    top: 4px;
    left: 0px;
    @media (max-width: 1279.9px) {
      width: 0;
    }
  }

  @media (max-width: 1279.9px) {
    width: auto;
    text-align: left;
    font-size: 14px;
    line-height: 19.5px;
    font-weight: 400;
  }
`;
const FooterMenu = () => {
  return (
    <Menu>
      <MenuItem>
        <MenuLink href="#">關於 STYLiSH</MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="#">服務條款</MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="#">隱私政策</MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="#">聯絡我們</MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="#">FAQ</MenuLink>
      </MenuItem>
    </Menu>
  );
};
export default FooterMenu;
