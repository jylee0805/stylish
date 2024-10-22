import { createContext, useState } from "react";
import member from "./Component/Header/img/member.png";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartNum, setCartNum] = useState(JSON.parse(localStorage.getItem("num")) || 0);

  const [profileImg, setProfileImg] = useState(
    JSON.parse(localStorage.getItem("login")) == null
      ? member
      : JSON.parse(localStorage.getItem("login")).data.user.picture
  );

  const handlerCartNum = () => {
    setCartNum(JSON.parse(localStorage.getItem("num")));
  };

  return (
    <AppContext.Provider value={{ cartNum, setCartNum, profileImg, setProfileImg, handlerCartNum }}>
      {children}
    </AppContext.Provider>
  );
};
