import React, { useEffect } from "react";

function NaverAuthCallback() {
  useEffect(() => {
    myFunction();
  });
  
  function myFunction() {
    const location = window.location.href.split('=')[1];
    const token = location.split('&')[0];    
    // console.log("예린의 예언:", token)
    fetch(`${process.env.REACT_APP_API_URL}/account/signinnaver`, {
      method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    })
    .then(res => res.json())
    .then(res => {
    //   console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res)
    //   console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res.token)
      localStorage.setItem('access-token', res.token)
      fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
        headers: {
          token: localStorage.getItem('access-token')
        }
      })
      .then(res => res.json())
      .then(res =>
        ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' ) 
      )  

    })


  }  

  return (
  <div id="naverIdLogin"
  >
  </div>
  )
}

export default NaverAuthCallback;
