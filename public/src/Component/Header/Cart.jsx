import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../AppContextProvider";
import cartHover from "./img/cart-hover.png";
import cartMobile from "./img/cart-mobile.png";
import cart from "./img/cart.png";

const Link = styled.a`
  position: relative;
  @media (max-width: 1279.9px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    position: relative;
    color: #fff;
  }
`;

const CartNum = styled.p`
  position: absolute;
  color: #fff;
  background: #8b572a;
  border-radius: 20px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  bottom: 0;
  right: 0;
`;

const CartBox = styled.div`
  position: relative;
`;

const FeatureName = styled.p`
  display: none;

  @media (max-width: 1279.9px) {
    display: block;
  }
`;
const CartImg = styled.img`
  ${Link}:hover & {
    content: url(${cartHover});
  }
  @media (max-width: 1279.9px) {
    content: url(${cartMobile});
  }
`;
const Cart = () => {
  const { cartNum } = useContext(AppContext);
  return (
    <>
      <Link href="/checkout">
        <CartBox>
          <CartImg src={cart} alt="cart-icon" />
          <CartNum>{cartNum}</CartNum>
        </CartBox>
        <FeatureName>購物車</FeatureName>
      </Link>
    </>
  );
};
export default Cart;
