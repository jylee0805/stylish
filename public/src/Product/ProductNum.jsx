import styled from "styled-components";
import ProductNumBtn from "./ProductNumBtn";

const NumSection = styled.div`
  display: flex;
  margin-bottom: 26px;
  align-items: center;
  column-gap: 21px;
  @media (max-width: 1279.9px) {
    margin-bottom: 10px;
  }
`;
const ItemName = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  @media (max-width: 1279.9px) {
    display: none;
  }
`;

const ProductNum = ({ handlerCount, count }) => {
  return (
    <NumSection>
      <ItemName>數量｜</ItemName>
      <ProductNumBtn handlerCount={handlerCount} count={count} />
    </NumSection>
  );
};
export default ProductNum;
