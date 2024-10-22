import styled from "styled-components";
import ColorList from "./ColorList";

const Container = styled.div`
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

const Color = ({ data, selectColor, handlerSelectColor }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <Container>
      <ItemName>顏色｜</ItemName>
      <ColorList data={data} selectColor={selectColor} handlerSelectColor={handlerSelectColor} />
    </Container>
  );
};
export default Color;
