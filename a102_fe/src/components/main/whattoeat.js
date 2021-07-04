/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";
import que from "../../assets/images/que.png"

function Whattoeat() {

    // 주석 처리 된 부분이 현재 위치 체크하는 부분~!
    
    // const axios = require("axios");
    // const config = {
    //     headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
    //     "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
    //     "Access-Control-Allow-Origin": "*",
    //     },
    // };

    // 현재 위치 가져오기
    let [address, setAddress] = useState("서울 종로구 창신동");

    // function successPosition(pos) {
    //     console.log(pos);
    //     axios.get(
    //         `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${pos.coords.longitude},${pos.coords.latitude}&orders=roadaddr&output=json`,
    //         config
    //     )
    //     .then((response) => {
    //         if (
    //         response.data.results[0] !== undefined &&
    //         response.data.results.length > 0
    //         )
    //         {
    //         let tempData = response.data.results[0].region;
    //         setAddress(
    //             `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`
    //         );
    //         }
    //     })
    //     .catch((error) => console.log(error));
    // }

    

    useEffect(() => {
        console.log("KAKAO")
        const {kakao} = window;
        // navigator.geolocation.getCurrentPosition(successPosition);
        navigator.geolocation.getCurrentPosition(function(pos){
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(pos.coords.longitude,
                pos.coords.latitude,
                function (result, status) {
                  if (status === kakao.maps.services.Status.OK) {
                      address = result[0].address_name
                    setAddress(address);
                    setStoreListComponent();
                  }
                })
        }, setAddress("서울 종로구 창신동"))
        
    }, []);

    // 전체 매장 리스트
    let [storeList, setStoreList] = useState([]);

    function setStoreListComponent() {
        console.log(address)
        if (address !== "") {
        fetch(
            `${process.env.REACT_APP_API_URL}/main/mapview/storelist/${encodeURIComponent(
            // `http://i4a102.p.ssafy.io:8080/app/main/mapview/storelist/${encodeURIComponent(
            address
            )}`
        )
        .then((res) => res.json())
        .then((result) => {
            storeList = result[0];
            setStoreList(storeList);
        });
        }
    }

    // 가게, 음식 변수
    let {idx} = 0;
    let {menuidx} = 0;
    let [store, setStore] = useState("우리끼니");
    let [menu, setMenu] = useState("맛있는 한 끼");

    // 가게의 메뉴 리스트
    function ChooseMenu(){
        idx = Math.floor(Math.random() * storeList.length);
        setStore(storeList[idx].storeName);
        // 메뉴가 지금 국수나무에만 있어서 fetch 무조건 1번으로 해줬습니다!
        // 하지만 훼이크로 가게 이름은 바뀐다는거 슝슝~!
        // fetch(`http://i4a102.p.ssafy.io:8080/app/support/menulist/${storeList[idx].storeId}`)
        fetch(`${process.env.REACT_APP_API_URL}/support/menulist/1`)
        .then((res) => res.json())
        .then((result) => {
            menuidx = (Math.floor(Math.random() * result.length));
            // console.log(result[menuidx])
            while (result[menuidx].itemAvailable === 0){
                menuidx = (Math.floor(Math.random() * result.length));
            }
            setMenu(result[menuidx].itemName);
        })
    }

    return (
        <Card>
            <CardBody sm="12" className="childwte p-0">
                <h1>오늘은 뭐 먹을까?</h1>
                {/* <p>현재 위치 사용에 동의해주셔야, 근처에 있는 음식점을 추천드려요! 동의하지 않으실 경우, 랜덤으로 추천 음식들을 보여드립니다.</p> */}
                <Button className="choosemenubutton" onClick={ChooseMenu}><img src={que} alt="que"/></Button>
                <h2>같이</h2>
                <h2>{store}에서</h2>
                <h2>{menu}먹자!</h2>
            </CardBody>
        </Card>
    );
}

export default Whattoeat;
