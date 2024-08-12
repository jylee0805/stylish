import styled from "styled-components";
import CheckoutItem from "./CheckoutItem";

const ProductContainer = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  margin-bottom: 48px;
  width: 1160px;
  @media (max-width: 1279.9px) {
    width: 432px;
    margin-bottom: 20px;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;
const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 460px repeat(4, 1fr);
  column-gap: 10px;
  margin-bottom: 16px;
  text-align: center;
  @media (max-width: 1279.9px) {
    display: block;
    margin-bottom: 10px;
  }
`;
const Title = styled.p`
  @media (max-width: 1279.9px) {
    display: none;
  }
`;
const CartTitle = styled(Title)`
  text-align: left;
  font-weight: 700;
  display: block;
`;
const NumTitle = styled(Title)`
  margin-left: 5px;
`;
const PriceTitle = styled(Title)`
  margin-left: 35px;
`;
const TotalTitle = styled(Title)`
  margin-left: 70px;
`;
const Line = styled.div`
  height: 1px;
  width: 1160px;
  background: #3f3a3a;
  margin-bottom: 20px;
  display: none;
  @media (max-width: 1279.9px) {
    display: block;
    width: 432px;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;
const CartProductList = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  row-gap: 30px;
  border: 1px solid #979797;
  padding: 40px 30px;
  @media (max-width: 1279.9px) {
    border: none;
    padding: 0;
    row-gap: 40px;
  }
`;

const CheckoutProduct = ({
  cartItem,
  handlerRemove,
  handlerSelect,
  setCartItem,
}) => {
  return (
    <ProductContainer>
      <TitleContainer>
        <CartTitle>購物車</CartTitle>
        <NumTitle>數量</NumTitle>
        <PriceTitle>單價</PriceTitle>
        <TotalTitle>小計</TotalTitle>
      </TitleContainer>
      <Line />

      <CartProductList>
        {cartItem.map((item, index) => (
          <CheckoutItem
            productDetail={item}
            key={index}
            handlerSelect={handlerSelect}
            setCartItem={setCartItem}
            handlerRemove={handlerRemove}
          />
        ))}
      </CartProductList>
    </ProductContainer>
  );
};

export default CheckoutProduct;
