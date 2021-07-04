/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
import StoreMenuItem from "../store/storeMenuItem";

function useInterval(callback, delay){
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    }, [callback])

    useEffect(()=>{
        function tick(){
            savedCallback.current()
        }
        if(delay !== null){
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id)
            }
        }
    }, [callback, delay]);
}

function StoreMenuList() {
  let [trigger, setTrigger] = useState(true);

  function sendTriggerToParent() {
    //   console.log("TRIGGER!!!!")
    setTrigger(!trigger);
  }

  function moveToCreatePage() {
    window.location.href = "/menucreate";
  }
//   const jwtToken = localStorage.getItem("access-token")
// //     ? localStorage.getItem("access-token")
//     : "";
//   if (jwtToken === "") {
//     window.location.href = "/auth";
//   }
const jwtToken = `${process.env.REACT_APP_STORE_TOKEN}`

  let [storeMenuItem, setStoreMenuItem] = useState("");

  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      token: jwtToken,
    },
  };

  useInterval(async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/itemlist`, config)
      .then((res) => {
        // console.log(res);
        if (res.data !== undefined) {
        //   console.log(res.data);
          setStoreMenuItem(
            res.data.map((item, index) => {
              return (
                <StoreMenuItem
                  storeMenu={item}
                  key={index}
                  sendTriggerToParent={sendTriggerToParent}
                ></StoreMenuItem>
              );
            })
          );
        }
      });
}, 3000)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/itemlist`, config)
      .then((res) => {
        // console.log(res);
        if (res.data !== undefined) {
        //   console.log(res.data);
          setStoreMenuItem(
            res.data.map((item, index) => {
              return (
                <StoreMenuItem
                  storeMenu={item}
                  key={index}
                  sendTriggerToParent={sendTriggerToParent}
                ></StoreMenuItem>
              );
            })
          );
        }
      });
  }, [trigger]);

  return (
    <Col lg="5" xs="12" className="storeMenuList">
      <Card className="storeSupportListContainer col p-0">
        <CardHeader>
          <Row className="justify-content-between pl-3 pr-3">
          <h5 className="d-inline font-weight-bold mt-1">메뉴 목록</h5>
          <Button className="d-inline menuCreateButton pr-3" onClick={moveToCreatePage}>메뉴 추가</Button>
          </Row>
        </CardHeader>
        <CardBody className="storeMenuItemList">{storeMenuItem}</CardBody>
      </Card>
    </Col>
  );
}

export default StoreMenuList;