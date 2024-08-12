import styled from "styled-components";
import ProductSizeList from "./ProductSizeList";

const SizeSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 22px;
  margin-top: 35px;
  @media (max-width: 1279.9px) {
    column-gap: 12px;
    margin-bottom: 30px;
  }
`;
const ItemName = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  @media (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
  }
`;

const ProductSize = ({ data, selectSize, handlerSelectSize, isEnable }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <SizeSection>
      <ItemName>尺寸｜</ItemName>
      <ProductSizeList data={data} selectSize={selectSize} handlerSelectSize={handlerSelectSize} isEnable={isEnable} />
    </SizeSection>
  );
};
export default ProductSize;
