function KakaoPaymentCheck(props) {
  const pgToken = new URLSearchParams(props.location.search).get("pg_token");
  console.log(pgToken);

  const axios = require("axios");
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/payment/kakaopaySuccess?pg_token=${pgToken}`
    )
    .then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem("carts", []);
        localStorage.setItem("price", 0);
        window.opener.location.href = "/paymentSuccess";
        window.close();
      }
    });

  return (
    <div className="paymentCheckContainer">
      해당 창이 닫히지 않으면 강제로 닫은 후 다시 시도해주세요.
    </div>
  );
}

export default KakaoPaymentCheck;
