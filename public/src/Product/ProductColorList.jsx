import styled from "styled-components";

const Colors = styled.ul`
  display: flex;
  column-gap: 32px;
  @media (max-width: 1279.9px) {
    column-gap: 26px;
  }
`;
const ColorItem = styled.li`
  width: 24px;
  height: 24px;
  border: 1px solid #d3d3d3;
  background: ${(props) => props.color};
  position: relative;

  &::after {
    content: "";
    width: 36px;
    height: 36px;
    border: 1px solid#979797;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${(props) => (props.isSelect ? "block" : "none")};
  }
`;

const ProductColorList = ({ data, selectColor, handlerSelectColor }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <Colors>
      {data.colors.map((color, index) => (
        <ColorItem
          style={{ background: `#${color.code}` }}
          key={index}
          isSelect={selectColor === color.code}
          onClick={() => {
            handlerSelectColor(color.code);
          }}
        />
      ))}
    </Colors>
  );
};
export default ProductColorList;
