import styled from "styled-components";

const Total = styled.div`
  width: 240px;
  height: 282px;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr 1px 1fr 1fr;
  margin-left: auto;
  row-gap: 20px;
  margin-bottom: -20px;
  align-items: baseline;
  @media (max-width: 1279.9px) {
    height: 248px;
    grid-template-columns: repeat(4, 1fr);
    margin-left: 0;
    width: 100%;
    row-gap: 10px;
    margin-bottom: -10px;
  }
`;
const Line = styled.div`
  height: 1px;
  width: 240px;
  background: #3f3a3a;
  margin-bottom: 25px;
  grid-column-start: 1;
  grid-column-end: span 2;
  grid-row: 3;
  @media (max-width: 1279.9px) {
    margin-top: -12px;
    grid-column-start: 3;
    grid-column-end: span 2;
  }
`;
const ItemTitle = styled.p`
  @media (max-width: 1279.9px) {
    grid-column-start: 3;
    grid-column-end: span 1;
  }
`;
const Cost = styled.p`
  text-align: right;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const DeliverCost = styled(Cost)`
  margin-right: 2px;
  @media (max-width: 1279.9px) {
    margin-top: -5px;
  }
`;
const TotalCost = styled(Cost)`
  margin-right: 1px;
  margin-top: -1px;
  @media (max-width: 1279.9px) {
    margin-top: -2px;
  }
`;
const CostValue = styled.span`
  font-size: 30px;
  line-height: 36px;
  margin-left: 8px;
`;
const Confirm = styled.button`
  height: 64px;
  background: #000;
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  grid-column-start: 1;
  grid-column-end: span 2;
  grid-row: 5;
  margin-top: 30px;
  padding-top: 5px;
  padding-right: 2px;
  @media (max-width: 1279.9px) {
    height: 44px;
    grid-column-start: 1;
    grid-column-end: span 4;
    margin-top: 8px;
    font-size: 16px;
  }
`;
const CheckoutTotal = ({ cartItem, handlerSubmit }) => {
  let total = 0;
  cartItem.forEach((item) => {
    total += item.price * item.num;
  });

  if (!cartItem) {
    return null;
  }
  let deliver = cartItem.length == 0 ? 0 : 30;
  return (
    <Total>
      <ItemTitle>總金額</ItemTitle>
      <Cost>
        NT.
        <CostValue>{total}</CostValue>
      </Cost>
      <ItemTitle>運費</ItemTitle>
      <DeliverCost>
        NT.
        <CostValue>{deliver}</CostValue>
      </DeliverCost>
      <Line />
      <ItemTitle>應付金額</ItemTitle>
      <TotalCost>
        NT.
        <CostValue>{total + deliver}</CostValue>
      </TotalCost>
      <Confirm onClick={() => handlerSubmit()}>確認付款</Confirm>
    </Total>
  );
};

export default CheckoutTotal;
