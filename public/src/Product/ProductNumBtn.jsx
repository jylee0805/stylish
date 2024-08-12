import styled from "styled-components";

const BtnBox = styled.div`
  border: 1px solid#979797;
  width: 160px;
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1279.9px) {
    width: 100%;
  }
`;
const Btn = styled.input`
  border: none;
  height: 100%;
  flex-grow: 1;
  font-size: 16px;
  line-height: 32px;
  color: #000;
  background: none;
`;

const Num = styled.p`
  border: none;
  width: 90px;
  text-align: center;
  color: #8b572a;
  font-size: 16px;
  line-height: 32px;

  @media (max-width: 1279.9px) {
    width: 50%;
  }
`;

const ProductNumBtn = ({ handlerCount, count }) => {
  return (
    <BtnBox>
      <Btn type="button" value="-" onClick={() => handlerCount(-1)} />
      <Num>{count}</Num>
      <Btn type="button" value="+" onClick={() => handlerCount(1)} />
    </BtnBox>
  );
};
export default ProductNumBtn;
