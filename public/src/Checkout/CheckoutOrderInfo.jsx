import styled from "styled-components";

const OrderInfo = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  margin-bottom: 50px;
  @media (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 19px;
  }
`;
const OrderTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 19px;
  @media (max-width: 1279.9px) {
    margin-bottom: 8px;
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
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 29.5px;
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
const Hint = styled.p`
  grid-column-start: 1;
  grid-column-end: span 2;
  grid-row: 2;
  text-align: right;
  margin-top: -20px;
  color: ${(props) => (props.isCorrect ? "#8b572a" : "#ff000097")};
  @media (max-width: 1279.9px) {
    grid-column-start: 1;
    grid-column-end: span 1;
    grid-row: 3;
    margin-top: -13px;
    margin-bottom: 10px;
    text-align: left;
  }
`;
const Label = styled.label`
  margin: auto 0;
`;
const Tip = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ff000097;
  margin-top: -20px;
  display: ${(props) => (props.isBlank ? "block" : "none")};
  grid-column: 2;
  @media (max-width: 1279.9px) {
    grid-column: 1;
    margin-top: 0px;
  }
`;
const FormatTip = styled(Tip)`
  display: ${(props) => (props.isCorrect ? "none" : "block")};
`;
const TypeInput = styled.input`
  width: 576px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #979797;
  outline: ${(props) => (props.isBlank ? "2px solid #ff000097" : "none")};
  @media (max-width: 1279.9px) {
    width: 432px;
    ${Label} + & {
      margin-bottom: 10px;
    }
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;
const RadioBox = styled.div`
  display: flex;
  align-items: center;
`;
const RadioBtn = styled.input`
  margin: auto 0;
  width: 16px;
  height: 16px;
  margin: 5px 8px 5px 0;
  @media (max-width: 479px) {
    margin: 5px 6px 5px 0;
  }

  ${Label} + & {
    margin-left: 32px;
    @media (max-width: 1279.9px) {
      margin-left: 26px;
    }
  }
`;
const CheckoutOrderInfo = ({ formData, handlerOnChange, isBlank, isCorrect }) => {
  const handlerInput = (e) => {
    handlerOnChange(e.target.name, e.target.value);
  };
  return (
    <OrderInfo>
      <OrderTitle>訂購資料</OrderTitle>
      <Line />
      <Form action="">
        <Label htmlFor="">收件人姓名</Label>
        <TypeInput type="text" value={formData.name} name="name" onChange={handlerInput} isBlank={isBlank.name} />
        <Hint isCorrect={isCorrect.name}>務必填寫完整收件人姓名，避免包裹無法順利簽收</Hint>

        <Label htmlFor="">手機</Label>
        <TypeInput
          type="text"
          value={formData.telphone}
          name="telphone"
          onChange={handlerInput}
          isBlank={isBlank.telphone}
        />
        <FormatTip isCorrect={isCorrect.telphone}>請輸入正確手機</FormatTip>

        <Label htmlFor="">地址</Label>
        <TypeInput
          type="text"
          value={formData.address}
          name="address"
          onChange={handlerInput}
          isBlank={isBlank.address}
        />

        <Label htmlFor="">Email</Label>
        <TypeInput type="email" value={formData.email} name="email" onChange={handlerInput} isBlank={isBlank.email} />
        <FormatTip isCorrect={isCorrect.email}>請輸入正確Email</FormatTip>

        <Label htmlFor="">配送時間</Label>
        <RadioBox>
          <RadioBtn type="radio" name="time" onChange={handlerInput} value="morning" />
          <Label htmlFor="">08:00-12:00</Label>

          <RadioBtn type="radio" name="time" onChange={handlerInput} value="afternoon" />
          <Label htmlFor="">14:00-18:00</Label>

          <RadioBtn type="radio" name="time" onChange={handlerInput} value="anytime" />
          <Label htmlFor="">不指定</Label>
        </RadioBox>
        <Tip isBlank={isBlank.time}>請選擇時間</Tip>
      </Form>
    </OrderInfo>
  );
};

export default CheckoutOrderInfo;
