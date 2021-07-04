import React from "react";

// import Kakao from "kakaojs";
const { Kakao } = window; 
// const obj = {};

function KakaoAuth() {
  function loginWithKakao() {
    Kakao.Auth.login({
      success: function(authObj) {
        // alert(JSON.stringify(authObj))
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            // console.log(response.id);
            // console.log(response.kakao_account.profile.nickname);
            // console.log(process.env.REACT_APP_API_URL)
            fetch(`${process.env.REACT_APP_API_URL}/account/signinkakao`, {
              method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: response.id,
                  userName: response.kakao_account.profile.nickname,
                })
              })
            .then(res => res.json())
            .then(res => {
              // console.info("현재 우리가 받는 res의 형태는:", res)
              // if (Boolean(res) == true) {
            //   console.info("loginWithKakao 함수 성공한 경우 자동 로그인:", res)
            //   console.info("loginWithKakao 함수 성공한 경우 자동 로그인:", res.token)
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
              // } else {
              //   console.info("값이 없는 아이디를 보낼 경우:", res);
              //   fetch(`http://i4a102.p.ssafy.io:8080/app/account/signupkakao`, {
              //     method: "POST",
              //     headers: {
              //       'Content-Type': 'application/json'
              //     },
              //     body: JSON.stringify({
              //       userId: response.id,
              //       userName: "kakao@"+response.id,
              //       userPhone: "kakao@"+response.id,
              //       userEmail: "kakao@"+response.id
              //     })
              //   })
              //   // .then(res => res.json())
              //   .then(res => {
              //     console.info("카카오로 회원가입한 경우 자동 로그인:", res)
              //     localStorage.setItem('access-token', res.token)
              //   })
              // }              
            })
          },
        })
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      }
    })
  }
  return (
    // <a id="custom-login-btn" href="javascript:loginWithKakao()">
    // 원래는 위와 같은 형태였는데, onclick으로 바꿔보겠습니다. 
    <a id="custom-login-btn" href="#"
      onClick={() => loginWithKakao()}
      >
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        height="36px"
        alt="kakaoLogin"
      />
    </a>
  //   Kakao.Auth.createLoginButton({
  //     container: '#kakao-login-btn',
  //     success: function (authObj) {
  //         //alert(JSON.stringify(authObj));
  //         //alert(JSON.stringify(authObj));
  //         Kakao.API.request({
  //             url: '/v2/user/me',
  //             success: function (response) {
  //                 console.log(response.id);
  //                 const id = response.id;
  //                 console.log("kakao@"+id);
                  
  //                 fetch(`/account/signinkakao`, {
  //                     method: "POST",
  //                        headers: {
  //                          'Content-Type': 'application/json'
  //                        },
  //                        body: JSON.stringify({
  //                            userId: id
  //                        })
  //                    })
  //                    .then(res => res.json())
  //                 .then(res => {
  //                   console.info("Signup 함수 성공한 경우 자동 로그인:", res)
  //                   //localStorage.setItem('access-token', res.token)
  //                 })
  //                 //alert(JSON.stringify(response));
  //             },
  //             fail: function (err) {
  //                 console.log(err);
  //                 //alert(JSON.stringify(err));
  //             }
  //         });
  //     },
  //     fail: function (err) {
  //         alert(JSON.stringify(err));
  //     }
  // })
  );
}

export default KakaoAuth;