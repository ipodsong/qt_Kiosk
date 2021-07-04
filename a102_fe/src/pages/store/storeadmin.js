/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import StoreDetailInfo from "../../components/support/storeDetailInfo";
import StoreMenuList from "../../components/store/storeMenuList";
import StoreSupportList from "../../components/store/storeSupportList";

function StoreAdmin() {
  

//   const jwtToken = localStorage.getItem("access-token")
    // // ? localStorage.getItem("access-token")
//     : "";
//   if (jwtToken === "") {
//     window.location.href = "/auth";
//   }

  const jwtToken = `${process.env.REACT_APP_STORE_TOKEN}`

  let [storeDetailComponent, setStoreDetailComponent] = useState("");

  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      token: jwtToken,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/basicinfo`, config)
      .then((res) => {
        if (res.data !== undefined) {
          setStoreDetailComponent(
            <StoreDetailInfo storeInfo={res.data.storeId}></StoreDetailInfo>
          );
        }
      })
  }, []);

  return (
    <Col className="storeAdminContainer">
      <Row className="row">
        <Col sm="12" md={{ size: 10, offset: 1 }} id="storetitle">
          <h3>가게 페이지</h3>
        </Col>
        {storeDetailComponent}
        <StoreMenuList />
        <StoreSupportList />
      </Row>
    </Col>
  );
}

export default StoreAdmin;
