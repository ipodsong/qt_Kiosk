const { Kakao } = window; 

function Signout() {
  return (
    // kakao 로그아웃 왜 안될까?
    Kakao.Auth.logout(function() {
    //   console.log(Kakao.Auth.getAccessToken());
    }),

    // Signout 버튼을 클릭하면 우선 로컬스토리지에서 access-token을 해제합니다.
    localStorage.removeItem('access-token'),

    // 로그아웃되었다고 알려주고,
    alert("로그아웃되었습니다"),

    // 성공적으로 로그아웃되었습니다 대신 URL을 리다이렉트 해주고 싶다!
    window.location.href = '/'
  );
}
export default Signout;