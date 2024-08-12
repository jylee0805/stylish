import styled from "styled-components";
import ProductInform from "./ProductInform";

const ProductMain = styled.div`
  display: flex;
  column-gap: 40px;
  margin-bottom: 51px;
  @media (max-width: 1279.9px) {
    display: block;
    margin-bottom: 0;
  }
`;
const ProductImg = styled.img`
  width: 560px;
  height: 746px;
  margin-left: 6px;
  @media (max-width: 1279.9px) {
    width: 480px;
    margin-left: 0;
    height: auto;
  }
`;

const ProductHeader = ({ data, handlerCartNum }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <ProductMain>
      <ProductImg src={data.main_image} alt="product img" />
      <ProductInform data={data} handlerCartNum={handlerCartNum} />
    </ProductMain>
  );
};
export default ProductHeader;
