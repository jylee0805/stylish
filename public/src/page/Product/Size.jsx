import styled from "styled-components";
import SizeList from "./SizeList";

const Container = styled.div`
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

const Size = ({ data, selectSize, handlerSelectSize, isEnable }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <Container>
      <ItemName>尺寸｜</ItemName>
      <SizeList data={data} selectSize={selectSize} handlerSelectSize={handlerSelectSize} isEnable={isEnable} />
    </Container>
  );
};
export default Size;
