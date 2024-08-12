import styled from "styled-components";
import ProductColorList from "./ProductColorList";

const ColorSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  column-gap: 20px;
  @media (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
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

const ProductColor = ({ data, selectColor, handlerSelectColor }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <ColorSection>
      <ItemName>顏色｜</ItemName>
      <ProductColorList data={data} selectColor={selectColor} handlerSelectColor={handlerSelectColor} />
    </ColorSection>
  );
};
export default ProductColor;
