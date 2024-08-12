import styled from "styled-components";
import trash from "./img/cart-remove.png";

const CartProductItem = styled.li`
  display: grid;
  grid-template-columns: 410px 1fr 44px;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  align-items: center;
  position: relative;
  row-gap: 20px;
  column-gap: 10px;
  @media (max-width: 1279.9px) {
    grid-template-columns: 1fr;
    column-gap: 0px;
    font-size: 14px;
    line-height: 17px;

    & + &::before {
      content: "";
      height: 1px;
      width: 100%;
      background: #000;
      position: absolute;
      top: -20px;
      left: 0;
    }
  }
`;
const CartProductHeader = styled.div`
  display: flex;
  column-gap: 15px;
  @media (max-width: 1279.9px) {
    column-gap: 10px;
  }
`;
const Text = styled.div``;
const CartProductImg = styled.img`
  width: 114px;
  height: 152px;
`;
const CartProducTitle = styled.p`
  margin-bottom: 18px;
  @media (max-width: 1279.9px) {
    margin-bottom: 20px;
  }
`;
const CartProducId = styled.p`
  margin-bottom: 22px;
  @media (max-width: 1279.9px) {
    margin-bottom: 24px;
  }
`;
const CartProducColor = styled.p`
  margin-bottom: 10px;
  @media (max-width: 1279.9px) {
    margin-bottom: 12px;
  }
`;
const CartProductInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 192px 192px;
  @media (max-width: 1279.9px) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-start: 1;
    grid-column-end: span 3;
    grid-row: 2;
  }
`;
const InfoItem = styled.div``;
const Title = styled.p`
  display: none;
  @media (max-width: 1279.9px) {
    display: block;
    text-align: center;
    margin-bottom: 12px;
  }
`;
const NumTitle = styled(Title)`
  @media (max-width: 1279.9px) {
    text-align: left;
    margin-left: 38px;
  }
`;
const SingleTitle = styled(Title)`
  @media (max-width: 479px) {
    margin-left: 28px;
  }
  @media (max-width: 479px) {
    margin-left: 0;
  }
`;
const TotalTitle = styled(Title)`
  margin-left: 40px;
  @media (max-width: 479px) {
    margin-left: 16px;
  }
  @media (max-width: 479px) {
    margin-left: 0px;
  }
`;
const CartProducNum = styled.select`
  display: block;
  width: 80px;
  height: 32px;
  color: #3f3a3a;
  background: #f3f3f3;
  border: 1px solid #979797;
  border-radius: 8px;
  margin: 0 auto;
  padding: 6px 10px;
  margin-left: 63px;
  font-size: 16px;
  @media (max-width: 1279.9px) {
    height: 30px;
    padding: 7px 16px;
    margin: 0;
    margin-left: 12px;
  }
`;
const CartProducNumOption = styled.option``;
const CartProducSize = styled.p``;
const CartProducPrice = styled.p`
  margin-top: 9px;
  margin-left: 22px;
  @media (max-width: 1279.9px) {
    margin-top: 18px;
    margin-left: 43px;
  }
  @media (max-width: 479px) {
    margin-left: 24px;
  }
`;
const CartProducTotal = styled.p`
  margin-top: 9px;
  margin-left: 22px;
  @media (max-width: 1279.9px) {
    margin-top: 18px;
    margin-left: 63px;
  }
  @media (max-width: 479px) {
    margin-left: 23px;
  }
`;
const CartProducRemove = styled.button`
  width: 44px;
  height: 44px;
  background-color: transparent;
  border: none;
  background-image: url(${trash});
  margin: 0 auto;
  @media (max-width: 1279.9px) {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const CheckoutItem = ({ productDetail, handlerSelect, handlerRemove }) => {
  let price = productDetail.price;
  let stock = productDetail.stock;

  if (!productDetail) {
    return null;
  }

  return (
    <CartProductItem>
      <CartProductHeader>
        <CartProductImg src={productDetail.main_image} alt="product Img" />
        <Text>
          <CartProducTitle>{productDetail.title}</CartProducTitle>
          <CartProducId>{productDetail.id}</CartProducId>
          <CartProducColor>顏色｜{productDetail.color.name}</CartProducColor>
          <CartProducSize>尺寸｜{productDetail.size}</CartProducSize>
        </Text>
      </CartProductHeader>
      <CartProductInfo>
        <InfoItem>
          <NumTitle>數量</NumTitle>
          <CartProducNum
            onChange={(e) => handlerSelect(e.target.value, productDetail.id, productDetail.color, productDetail.size)}
          >
            {Array.from({ length: stock }, (_, index) => (
              <CartProducNumOption key={index + 1} value={index + 1} selected={index + 1 == productDetail.num}>
                {index + 1}
              </CartProducNumOption>
            ))}
          </CartProducNum>
        </InfoItem>
        <InfoItem>
          <SingleTitle>單價</SingleTitle>
          <CartProducPrice>TWD.{productDetail.price}</CartProducPrice>
        </InfoItem>
        <InfoItem>
          <TotalTitle>小計</TotalTitle>
          <CartProducTotal>TWD.{price * productDetail.num}</CartProducTotal>
        </InfoItem>
      </CartProductInfo>
      <CartProducRemove onClick={() => handlerRemove(productDetail.id, productDetail.color, productDetail.size)} />
    </CartProductItem>
  );
};

export default CheckoutItem;
