import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  @media (max-width: 1279.9px) {
    margin-top: 40px;
  }
`;

const Title = styled.h3`
  font-size: 30px;
`;
const OrderNumber = styled.p`
  font-size: 24px;
`;
const ThanksPage = () => {
  const checkoutNumber = useLocation();

  return (
    <Wrap>
      <Title>感謝您的購買，以下為您的訂單編號</Title>
      <OrderNumber>{checkoutNumber.state}</OrderNumber>
    </Wrap>
  );
};

export default ThanksPage;
