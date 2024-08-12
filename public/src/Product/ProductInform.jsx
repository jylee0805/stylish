import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App-context";
import ProductColor from "./ProductColor";
import ProductSize from "./ProductSize";
import ProductNum from "./ProductNum";

const Info = styled.div`
  color: #3f3a3a;

  @media (max-width: 1279.9px) {
    margin: 11px 24px 0;
  }
`;
const Title = styled.h2`
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 6.4px;
  margin-bottom: 16px;

  @media (max-width: 1279.9px) {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    margin-bottom: 10px;
  }
`;
const Id = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #bababa;
  margin-bottom: 40px;

  @media (max-width: 1279.9px) {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    margin-bottom: 20px;
  }
`;
const Price = styled.h3`
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 20px;
  @media (max-width: 1279.9px) {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 8px;
  }
`;
const Line = styled.div`
  height: 1px;
  width: 360px;
  background: #3f3a3a;
  margin-bottom: 30px;
  @media (max-width: 1279.9px) {
    width: 100%;
  }
`;
const AddBtn = styled.button`
  width: 360px;
  display: block;
  background: #000;
  color: #fff;
  padding: 18px 0 13px;
  line-height: 30px;
  letter-spacing: 4px;
  font-size: 20px;
  margin-bottom: 40px;
  @media (max-width: 1279.9px) {
    width: 100%;
    letter-spacing: 3.2px;
    font-size: 16px;
    margin-bottom: 24px;
    padding: 7px;
  }
`;
const Material = styled.p`
  font-size: 20px;
  line-height: 30px;
  margin-left: 6px;
  @media (max-width: 1279.9px) {
    font-size: 14px;
    line-height: 24px;
    margin-left: 0px;
    margin-bottom: 28px;
  }
`;

const ProductInform = ({ data }) => {
  const { handlerCartNum } = useContext(AppContext);
  const [selectColor, setSelectColor] = useState("");
  const [sizeEnable, setSizeEnable] = useState([]);
  const [selectSize, setSelectSize] = useState([]);
  const [addBtnText, setAddBtnText] = useState("請選擇顏色");
  const [variant, setVariants] = useState([]);
  const [count, setCount] = useState(0);
  const [cartItem, setCartItem] = useState(
    !JSON.parse(localStorage.getItem("cartItem")) ? [] : JSON.parse(localStorage.getItem("cartItem"))
  );
  let localvariant = JSON.parse(localStorage.getItem("variants"));
  let description = String(data.description ?? []).split("\r\n");

  useEffect(() => {
    if (data && data.sizes) {
      const initialBtns = data.sizes.map(() => ({
        isDisabled: true,
      }));
      setSizeEnable(initialBtns);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const handlerSelectColor = (color) => {
    let colorVariant = localvariant.filter((item) => item.color_code == color);
    const updateSizeEnable = colorVariant.map((item) => ({
      isDisabled: item.stock == 0,
    }));

    setSelectColor(color);
    setVariants(colorVariant);
    setSelectSize([]);
    setCount(0);
    setAddBtnText("請選擇尺寸");
    setSizeEnable(updateSizeEnable);
  };

  const handlerSelectSize = (size) => {
    let sizevariant = variant.find((item) => item.size == size);
    setSelectSize(sizevariant);
    setAddBtnText("請選擇數量");
    setCount(0);
  };

  const handlerCount = (delta) => {
    setCount((prevCount) => {
      if (prevCount == 0 && delta == -1) {
        return 0;
      }
      if (prevCount == 1 && delta == -1) {
        setAddBtnText("請選擇數量");
        return 0;
      } else {
        setAddBtnText("加入購物車");
        if (prevCount == selectSize.stock) {
          return prevCount;
        }
      }
      return prevCount + delta;
    });
  };

  const reset = () => {
    setSelectColor("");
    setSelectSize([]);
    setCount(0);
    setAddBtnText("請選擇顏色");
    if (data && data.sizes) {
      const initialBtns = data.sizes.map(() => ({
        isDisabled: true,
      }));
      setSizeEnable(initialBtns);
    }
  };

  const handlerAdd = () => {
    let cartItemColor;
    let cartNum = JSON.parse(localStorage.getItem("num"));
    let stock = selectSize.stock;
    let replace = localvariant.findIndex(
      (item) => item.color_code == selectSize.color_code && item.size == selectSize.size
    );

    data.colors.forEach((item) => {
      if (item.code == selectSize.color_code) {
        cartItemColor = item;
      }
    });

    localStorage.setItem("num", JSON.stringify(count + cartNum));
    selectSize.stock = selectSize.stock - count;
    localvariant[replace] = selectSize;
    localStorage.setItem("variants", JSON.stringify(localvariant));

    setCartItem((prevItem) => {
      const itemExists = prevItem.some(
        (item) => item.id === data.id && item.color.name === cartItemColor.name && item.size === selectSize.size
      );

      if (itemExists) {
        return prevItem.map((item) => {
          if (item.id == data.id && item.color.name == cartItemColor.name && item.size == selectSize.size) {
            return {
              id: item.id,
              title: item.title,
              main_image: item.main_image,
              price: item.price,
              color: item.color,
              size: item.size,
              stock: item.stock,
              num: item.num + count,
            };
          }
          return item;
        });
      }
      return [
        ...prevItem,
        {
          id: data.id,
          title: data.title,
          main_image: data.main_image,
          price: data.price,
          color: cartItemColor,
          size: selectSize.size,
          stock: stock,
          num: count,
        },
      ];
    });

    handlerCartNum();
    alert("成功加入購物車");
    reset();
  };

  return (
    <Info>
      <Title>{data.title}</Title>
      <Id>{data.id}</Id>
      <Price>TWD.{data.price}</Price>
      <Line></Line>
      <ProductColor data={data} selectColor={selectColor} handlerSelectColor={handlerSelectColor} />
      <ProductSize
        data={data}
        selectSize={selectSize.size}
        handlerSelectSize={handlerSelectSize}
        isEnable={sizeEnable}
      />
      <ProductNum handlerCount={handlerCount} count={count} />
      <AddBtn onClick={handlerAdd} disabled={count == 0}>
        {addBtnText}
      </AddBtn>
      <Material>
        {data.note}
        <br />
        <br />
        {data.texture}
        <br />
        {description[0]}
        <br />
        {description[1]}
        <br />
        <br />
        清洗：{data.wash}
        <br />
        產地：{data.place}
      </Material>
    </Info>
  );
};
export default ProductInform;
