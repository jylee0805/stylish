import styled from "styled-components";
import member from "./Component/Header/img/member.png";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "./App-context";

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
const LoginTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;
const LoginBtn = styled.button`
  background: #000;
  color: #fff;
  font-size: 18px;
  line-height: 36px;
  padding: 0 30px;
  border-radius: 10px;
`;
const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
`;
const ProfileEmail = styled.p`
  font-size: 20px;
`;
const MemberPage = () => {
  const { setProfileImg } = useContext(AppContext);
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));

  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = () => {
        window.fbAsyncInit = function () {
          // 初始化 Facebook SDK
          window.FB.init({
            appId: 1240870317271548,
            cookie: true,
            xfbml: true,
            version: "v20.0",
          });

          window.FB.getLoginStatus(function (response) {
            console.log("[refreshLoginStatus]", response);
            if (response.status == "connected") {
              ajax(response.authResponse.accessToken).then((data) => {
                console.log(data);
                setLogin(data);
              });
            }
          });
          window.FB.AppEvents.logPageView();
        };
      };
    })(document, "script", "facebook-jssdk");

    console.log(login);
  }, []);
  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);

  function ajax(token) {
    let headers = { "Content-Type": "application/json" };
    let body = {
      provider: "facebook",
      access_token: token,
    };
    return fetch(`https://api.appworks-school.tw/api/1.0/user/signin`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.status == "connected") {
          ajax(response.authResponse.accessToken).then((data) => {
            setLogin(data);
            setProfileImg(data.data.user.picture);
          });
        }
      },
      { scope: "public_profile,email" }
    );
  };

  const handleFBLogout = () => {
    window.FB.logout(() => {
      setLogin(null);
      setProfileImg(member);
      localStorage.removeItem("login");
    });
  };

  return login == undefined ? (
    <Wrap>
      <LoginTitle>會員登入</LoginTitle>
      <LoginBtn onClick={handleFBLogin}>FaceBook 登入</LoginBtn>
    </Wrap>
  ) : (
    <Wrap>
      <ProfileImg src={login.data.user.picture} alt="" />
      <LoginTitle>{login.data.user.name}</LoginTitle>
      <ProfileEmail>{login.data.user.email}</ProfileEmail>
      <LoginBtn onClick={handleFBLogout}>登出</LoginBtn>
    </Wrap>
  );
};

export default MemberPage;
