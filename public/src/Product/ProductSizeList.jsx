import styled from "styled-components";

const Sizes = styled.div`
  display: flex;
  column-gap: 20px;
  @media (max-width: 1279.9px) {
    column-gap: 15px;
  }
`;
const SizeItem = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${(props) => {
    if (props.disabled) {
      return "rgba(236, 236, 236, 0.25)";
    }
    return props.isSelect ? "#000" : "rgba(236, 236, 236, 0.25)";
  }};
  color: ${(props) => {
    if (props.disabled) {
      return "rgba(63, 58, 58, 0.25)";
    }
    return props.isSelect ? "#fff" : "rgba(63, 58, 58, 0.25))";
  }};
`;
const ProductSizeList = ({ data, selectSize, handlerSelectSize, isEnable }) => {
  if (!data || Object.keys(data).length === 0 || isEnable.length <= 0) {
    return null;
  }

  return (
    <Sizes>
      {data.sizes.map((size, index) => (
        <SizeItem
          key={index}
          isSelect={selectSize === size}
          onClick={() => handlerSelectSize(size)}
          disabled={isEnable[index].isDisabled}
        >
          {size}
        </SizeItem>
      ))}
    </Sizes>
  );
};
export default ProductSizeList;
