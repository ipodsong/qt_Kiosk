/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { AiFillPhone } from "react-icons/ai";
import { BiMapAlt } from "react-icons/bi";

function StoreDetailInfo(storeInfo) {
  // const axios = require("axios");
  // const config = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
  //     "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // };

  let storeMiniMap = null;

  // 앞에서 더 잘 보내게끔 수정 필요
  const storeId = storeInfo.storeInfo;
  // 네이버 지도
  const { naver } = window;
  // 카카오 지도
  const { kakao } = window;

  let [storeInformation, setStoreInformation] = useState({});
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);

  function moveToGodkao() {
    window.open(
      `https://map.kakao.com/link/to/${storeInformation.storeName},${latitude},${longitude}`,
      "_blank"
    );
  }

  useEffect(() => {
    // 네이버 지도 초기화
    function initMap(latitude, longitude) {
      storeMiniMap = new naver.maps.Map("storeMiniMap", {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 15,
      });
      let centerMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: storeMiniMap,
      });
    }

    fetch(`${process.env.REACT_APP_API_URL}/support/storedetail/${storeId}`)
      .then((res) => res.json())
      .then((result) => {
        setStoreInformation(result);
        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new kakao.maps.services.Geocoder();
        // 현재 세팅돼있는 주소 -> 좌표 = 지도의 센터
        geocoder.addressSearch(result.storeLocation, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            initMap(result[0].y, result[0].x);
            setLongitude(result[0].x);
            setLatitude(result[0].y);
          } else {
            alert("잘못된 접근입니다.");
            window.history.back();
          }
        });
      });
  }, []);

  return (
    <Col lg={{ size: 2, offset: 1 }} xs="12" className="storeInfo">
      <Card className="storeInfoCard">
        <CardHeader className="cardHeader">
          <p className="font-weight-bold mt-1">{storeInformation.storeName}</p>
          <p className="font-weight-normal mb-0">
            #{storeInformation.storeCategory}
          </p>
        </CardHeader>
        <CardBody>
          <p className="font-weight-normal">
            <BiMapAlt /> {storeInformation.storeLocation}
          </p>
          <p className="font-weight-normal">
            <AiFillPhone /> {storeInformation.storePhone}
          </p>
          <p className="caution">
            아동급식카드의 1회 지원금은 6000원입니다.
            {/* <br /> */}
            아동이 메뉴를 먹을 수 있게 차액을 후원해주세요.
            {/* <br /> */}
            {/* 6000원 이하의 메뉴는 보여지지 않습니다. */}
            <br />* 가게의 실 메뉴와 차이가 있을 수 있습니다
          </p>
          <div className="storeMiniMap mt-4" id="storeMiniMap"></div>
          <Button className="findWayButton" block onClick={moveToGodkao}>
            길찾기
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
}

export default StoreDetailInfo;
