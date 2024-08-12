import styled from "styled-components";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutOrderInfo from "./CheckoutOrderInfo";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutTotal from "./CheckoutTotal";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App-context";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 1160px;
  margin: 0 auto 148px;

  @media (max-width: 1279.9px) {
    width: 432px;
    margin: 20px auto 28px;
  }
  @media (max-width: 479px) {
    width: 100vw;
    padding: 0 24px;
  }
`;

const Checkout = () => {
  const { handlerCartNum } = useContext(AppContext);
  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem("cartItem")) || []);

  const [isBlank, setIsBlank] = useState({
    name: false,
    telphone: false,
    address: false,
    email: false,
    time: false,
  });
  const [isCorrect, setIsCorrect] = useState({
    name: true,
    telphone: true,
    email: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    telphone: "",
    address: "",
    email: "",
    time: "",
  });

  let num = 0;
  let order = {};
  let list = [];

  cartItem.forEach((item) => (num += item.num));
  localStorage.setItem("num", JSON.stringify(num));

  const handlerOnChange = (target, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [target]: value,
      };
    });
  };

  useEffect(() => {
    if (window.TPDirect) {
      window.TPDirect.setupSDK("12348", "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF", "sandbox");

      if (window.TPDirect && window.TPDirect.card && window.TPDirect.card.setupCalled) {
        return;
      }

      window.TPDirect.card.setup({
        fields: {
          number: {
            element: "#card-number",
            placeholder: "Credit Card Number",
          },
          expirationDate: {
            element: "#card-expiration-date",
            placeholder: "MM/YY",
          },
          ccv: {
            element: "#card-ccv",
            placeholder: "CCV",
          },
        },
        styles: {
          input: {
            color: "gray",
          },
          ".valid": {
            color: "green",
          },
          ".invalid": {
            color: "red",
          },
          "@media screen and (max-width: 400px)": {
            input: {
              color: "orange",
            },
          },
        },
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
          beginIndex: 6,
          endIndex: 11,
        },
      });
      window.TPDirect.card.setupCalled = true;
    }
  }, []);

  useEffect(() => {
    setCartItem(JSON.parse(localStorage.getItem("cartItem")));
    handlerCartNum();
  }, [num]);

  function ajax(authorization, checkPrime, checkoutOrder) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    };

    let body = {
      prime: checkPrime,
      order: checkoutOrder,
    };

    return fetch(`https://api.appworks-school.tw/api/1.0/order/checkout`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  const navigate = useNavigate();

  const handlerSubmit = () => {
    let freight = 0;
    let subtotal = 0;

    cartItem.forEach((item) => {
      freight += item.num;
      subtotal += item.price * item.num;
      list.push({
        id: item.id,
        name: item.title,
        price: item.price,
        color: item.color,
        size: item.size,
        qty: item.num,
      });
    });

    order = {
      shipping: "delivery",
      payment: "credit_card",
      subtotal: subtotal,
      freight: freight,
      total: subtotal + 30,
      recipient: {
        name: formData.name,
        phone: formData.telphone,
        email: formData.email,
        address: formData.address,
        time: formData.time,
      },
      list: list,
    };

    let nameRegex = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
    let phoneRegex = new RegExp(/^09[0-9]{8}$/);
    let mailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);

    let isBlankTemp = {
      name: formData.name == "" ? true : false,
      telphone: formData.telphone == "" ? true : false,
      address: formData.address == "" ? true : false,
      email: formData.email == "" ? true : false,
      time: formData.time == "" ? true : false,
    };

    let isCorrectTemp = {
      name: nameRegex.test(formData.name),
      telphone: phoneRegex.test(formData.telphone),
      email: mailRegex.test(formData.email),
    };

    setIsBlank(isBlankTemp);
    setIsCorrect(isCorrectTemp);

    if (cartItem.length == 0) {
      alert("尚未加入商品");
      return;
    } else if (
      isBlankTemp.name ||
      isBlankTemp.telphone ||
      isBlankTemp.address ||
      isBlankTemp.email ||
      isBlankTemp.time ||
      !isCorrectTemp.name ||
      !isCorrectTemp.telphone ||
      !isCorrectTemp.email
    ) {
      alert("個人資料尚未填寫完全");
      return;
    }

    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();

    if (!tappayStatus.canGetPrime) {
      alert("請確認信用卡資訊");
      return;
    }

    window.TPDirect.card.getPrime((result) => {
      if (result.status === 0) {
        let token = JSON.parse(localStorage.getItem("login")).data.access_token;
        ajax(token, result.card.prime, order).then((data) => {
          localStorage.setItem("cartItem", []);
          localStorage.setItem("num", 0);
          handlerCartNum();
          navigate("/thanks", { state: data.data.number });
        });
      } else {
        console.error("Error:", result.msg);
      }
    });
  };

  const handlerSelect = (select, id, color, size) => {
    setCartItem((prevItem) => {
      return prevItem.map((item) => {
        if (item.id == id && item.color == color && item.size == size) {
          return {
            id: item.id,
            title: item.title,
            main_image: item.main_image,
            price: item.price,
            color: item.color,
            size: item.size,
            stock: item.stock,
            num: parseInt(select),
          };
        }
        return item;
      });
    });
  };

  localStorage.setItem("cartItem", JSON.stringify(cartItem));

  const handlerRemove = (id, color, size) => {
    setCartItem((prevItem) => prevItem.filter((item) => !(item.id == id && item.color == color && item.size == size)));
  };
  return (
    <Wrap>
      <CheckoutProduct
        cartItem={cartItem}
        handlerSelect={handlerSelect}
        setCartItem={setCartItem}
        handlerRemove={handlerRemove}
      />
      <CheckoutOrderInfo
        formData={formData}
        handlerOnChange={handlerOnChange}
        isBlank={isBlank}
        isCorrect={isCorrect}
      />
      <CheckoutPayment />
      <CheckoutTotal cartItem={cartItem} handlerSubmit={handlerSubmit} />
    </Wrap>
  );
};

export default Checkout;
