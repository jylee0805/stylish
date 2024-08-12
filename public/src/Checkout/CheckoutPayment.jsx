import styled from "styled-components";

const OrderPayment = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  margin-bottom: 40px;
  @media (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 12px;
  }
`;
const PaymentTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 16px;
  @media (max-width: 1279.9px) {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 10px;
  }
`;
const Line = styled.div`
  height: 1px;
  width: 1160px;
  background: #3f3a3a;
  margin-bottom: 25px;
  @media (max-width: 1279.9px) {
    width: 432px;
    margin-bottom: 20px;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;

const Tpfield = styled.div`
  width: 576px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 1px;
  border-radius: 8px;
  border: 1px solid #979797;
  padding: 0 8px;
`;
const Label = styled.label`
  margin: auto 0;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 30px;

  width: 696px;
  @media (max-width: 1279.9px) {
    width: 432px;
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;

const CheckoutPayment = () => {
  return (
    <OrderPayment>
      <PaymentTitle>付款資料</PaymentTitle>
      <Line />
      <Form>
        <Label htmlFor="card-number">信用卡號碼</Label>
        <Tpfield id="card-number"></Tpfield>
        <Label htmlFor="expiration-date">有效期限</Label>
        <Tpfield id="card-expiration-date"></Tpfield>
        <Label htmlFor="ccv">安全碼</Label>
        <Tpfield id="card-ccv"></Tpfield>
      </Form>
    </OrderPayment>
  );
};

export default CheckoutPayment;
