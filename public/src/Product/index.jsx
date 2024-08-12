import styled from "styled-components";
import ProductHeader from "./ProductHeader";
import { useEffect, useState } from "react";

const ProductContainer = styled.div`
  width: 960px;
  margin: 14px auto 19px;
  font-size: 20px;
  line-height: 30px;
  @media (max-width: 1279.9px) {
    max-width: 480px;
    margin: 0 auto;
  }
`;
const ProductMoreTitle = styled.h3`
  letter-spacing: 3px;
  color: #8b572a;
  margin-bottom: 28px;
  margin-left: 8px;
  position: relative;

  @media (max-width: 1279.9px) {
    margin: 0px 24px 12px;
    font-size: 16px;
    line-height: 30px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 761px;
    height: 1px;
    background: #3f3a3a;

    @media (max-width: 1279.9px) {
      width: 285px;
    }
  }
`;
const ProductText = styled.p`
  margin-bottom: 30px;
  margin-left: 8px;
  @media (max-width: 1279.9px) {
    margin: 0px 24px 20px;
    font-size: 14px;
    line-height: 25px;
  }
`;
const ProductMoreImg = styled.img`
  width: 960px;
  height: 540px;
  display: block;
  margin: 0 auto 30px 8px;
  @media (max-width: 1279.9px) {
    width: 432px;
    height: auto;
    margin-bottom: 20px;
  }
`;

const Product = () => {
  let urlString = location.href;
  let url = new URL(urlString);
  let urlId = url.searchParams.get("id");
  const [details, setDetails] = useState({});
  function ajax() {
    return fetch(`https://api.appworks-school.tw/api/1.0/products/details?id=${urlId}`)
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    ajax().then((data) => {
      if (data && data.data) {
        setDetails(data.data);
        let init = data.data;
        if (JSON.parse(localStorage.getItem("id")) != urlId) {
          localStorage.removeItem("variants");
        }
        if (!localStorage.getItem("variants")) {
          localStorage.setItem("variants", JSON.stringify(init.variants));
        }
        localStorage.setItem("id", JSON.stringify(init.id));
        setDetails(init);
      }
    });
  }, [urlId]);

  if (!details || Object.keys(details).length === 0) {
    return null;
  }

  return (
    <ProductContainer>
      <ProductHeader data={details} />
      <ProductMoreTitle>更多產品資訊</ProductMoreTitle>
      <ProductText>{details.story}</ProductText>
      {details &&
        details.images &&
        details.images.map((image, index) => <ProductMoreImg src={image} alt="product img" key={index} />)}
    </ProductContainer>
  );
};
export default Product;
