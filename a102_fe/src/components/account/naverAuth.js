import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";


const { naver } = window;

function NaverAuth() {
  useEffect((event) => {
    NaverLogin();
    // myFunction();
    // UserProfile();
    // getNaverToken();
  });

  function NaverLogin() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "xndTfTxd5lBs6cntAlPE",
      callbackUrl: "https://ooriggini.me/naver",
      isPopup: false /* 팝업을 통한 연동처리 여부 */,
      loginButton: {
        color: "green",
        type: 3,
        height: 36,
      } /* 로그인 버튼의 타입을 지정 */,
      callbackHandle: false,
    });

    /* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
  }

  return (
    <div>
      <div id="naverIdLogin"
      >
      </div>
    </div>
  );
}

export default NaverAuth;
