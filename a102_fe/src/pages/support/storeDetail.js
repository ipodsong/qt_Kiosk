import {
  Row,
  Col,
} from "reactstrap";
import StoreDetailInfo from "../../components/support/storeDetailInfo";
import SupportCart from "../../components/support/supportCart";

function StoreDetail(props) {
//   console.log("PROPS");
//   console.log(props);
  // 매장 ID 값
  const { storeId } = props.match.params;

//   console.log(props.match.params.storeId);

  return (
    <Col className="mainStoreDetail">
      <Row className="row">
        <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
          <h3>후원 음식 선택하기</h3>
        </Col>
        <StoreDetailInfo storeInfo={storeId} />
        <SupportCart storeInfo={storeId} />
      </Row>
    </Col>
  );
}

export default StoreDetail;
