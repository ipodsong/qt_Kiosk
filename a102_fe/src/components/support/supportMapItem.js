import { Row, Col, Button } from "reactstrap";

function SupportMapItem(storeInfo) {
  function moveToStoreDetail() {
    window.location.href = `storedetailsupport/${storeInfo.storeInfo.storeId}`;
    // if (storeInfo.storeInfo.supportCheck) {
    //   window.location.href = `storedetailsupport/${storeInfo.storeInfo.storeId}`;
    // } else {
    //   window.location.href = `storeDetail/${storeInfo.storeInfo.storeId}`;
    // }
    // window.location.href = `/storeDetail/${storeInfo.storeInfo.storeId}`
  }

  return (
    <Row className="mapListItem m-1 p-0">
      <Col xs="9" className="pt-1">
        <Row><b>{storeInfo.storeInfo.storeName}</b></Row>
        <Row><p>{storeInfo.storeInfo.storeLocation}</p></Row>
      </Col>
      <Col xs="3"><Button onClick={moveToStoreDetail}>후원하러가기</Button></Col>
    </Row>
  );
}

export default SupportMapItem;
