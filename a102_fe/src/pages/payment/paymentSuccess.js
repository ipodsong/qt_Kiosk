import { Col, Button, Row } from "reactstrap";
import PaymentSending from "./paymentSending";
import oori from "../../assets/images/oori.png"

function PaymentSuccess() {

  function moveToMain() {
    window.location.href = "/";
  }

  return (
    <Col className="paymentSuccessContainer">
      <PaymentSending/>
      <Row className="justify-content-center">
        <img src={oori} alt="oori"/>
        <h5 className="col-12 text-center">
          당신의 따뜻함이 아동의 미래의 빛이 되길 바랍니다.
        </h5>
        <Button className="col-3 paymentSuccessButton" onClick={moveToMain}>
          메인페이지로 이동
        </Button>
      </Row>
    </Col>
  );
}

export default PaymentSuccess;
