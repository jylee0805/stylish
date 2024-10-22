import { useEffect, useState } from "react";
import styled from "styled-components";
import search from "./img/search.png";

const Container = styled.div`
  position: relative;

  @media (max-width: 1279.9px) {
    width: 98%;
    position: fixed;
    top: 3px;
    right: 0;
    height: 40px;
    margin: 0 6px;
  }
`;

const SearchInput = styled.input`
  width: 214px;
  height: 44px;
  padding: 20px 40px 20px 20px;
  border-radius: 20px;
  border: 1px solid #979797;
  font-size: 20px;
  line-height: 24px;
  font-family: "Noto Sans TC", sans-serif;
  display: ${(props) => (props.isToggle ? "block" : "none")};
  @media (max-width: 1279.9px) {
    width: 100%;
    display: none;
  }
`;

const SearchBtn = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  background: transparent;
  border: none;
  display: block;
  padding: 0;

  @media (max-width: 1279.9px) {
    width: 40px;
    height: 40px;
    top: 5px;
    right: 10px;
  }
`;

const Search = () => {
  let urlString = location.href;
  let url = new URL(urlString);
  const [toggle, setToggle] = useState(true);

  const handleSearchSubmit = (e) => {
    if (e.keyCode == 13) {
      let searchValue = e.target.value;
      let searchUrl;
      if (searchValue !== "") {
        searchUrl = new URLSearchParams(`search=${searchValue}`);
        url.search = searchUrl;
        url.pathname = "/homePage.html";
        location.href = url;
      }
    }
  };

  const searchBtnClick = () =>
    setToggle((prevToggle) => {
      if (screen.width < 1280) {
        console.log(screen.width);
        prevToggle = !toggle;
      }
      return prevToggle;
    });

  useEffect(() => {
    const resizeHandler = () => {
      setToggle((prevToggle) => {
        if (screen.width > 1280 && !prevToggle) {
          prevToggle = !toggle;
        } else if (screen.width < 1280 && prevToggle) {
          prevToggle = !toggle;
        }
        return prevToggle;
      });
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [screen.width]);

  return (
    <Container>
      <SearchInput type="search" placeholder="西裝" onKeyDown={handleSearchSubmit} isToggle={toggle} />
      <SearchBtn onClick={searchBtnClick}>
        <img src={search} alt="search-icon" />
      </SearchBtn>
    </Container>
  );
};
export default Search;
