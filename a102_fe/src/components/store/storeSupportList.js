/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { FcLike } from "react-icons/fc";

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

function StoreSupportList() {
//   const jwtToken = localStorage.getItem("access-token")
// //     ? localStorage.getItem("access-token")
//     : "";
//   if (jwtToken === "") {
//     window.location.href = "/auth";
//   }

const jwtToken = `${process.env.REACT_APP_STORE_TOKEN}`

  const monthArray = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let dateObject = new Date();
  let todayDate =
    dateObject.getFullYear() + "-" + monthArray[dateObject.getMonth()] + "-";
  if (dateObject.getDate() < 10) {
    todayDate += "0" + dateObject.getDate();
  } else {
    todayDate += dateObject.getDate();
  }

  let todayTime = "";
  if (dateObject.getHours() < 10) {
    todayTime += "0" + dateObject.getHours() + ":";
  } else {
    todayTime += dateObject.getHours() + ":";
  }
  if (dateObject.getMinutes() < 10) {
    todayTime += "0" + dateObject.getMinutes() + ":";
  } else {
    todayTime += dateObject.getMinutes() + ":";
  }
  if (dateObject.getSeconds() < 10) {
    todayTime += "0" + dateObject.getSeconds();
  } else {
    todayTime += dateObject.getSeconds();
  }

  // 문자열 형식으로 세팅
  let [startDate, setStartDate] = useState(todayDate);
  let [endDate, setEndDate] = useState(todayDate);
  let [currentTime, setCurrentTime] = useState(todayTime);
  // 해당 기간 내 받은 후원 내역
  let [contributions, setContributions] = useState([]);

  useInterval(async () => {
    let contrib = null
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/store/contributionlist?endDate=${endDate} ${currentTime}&startDate=${startDate} ${currentTime}`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: jwtToken,
      },
    })
      .then((res) => {
        // console.log(res.data);
        contrib = res.data
        setContributions(contrib)
      });
}, 3000)

  // 시간 변경
  function changeCurrentTime() {
    let dateObject = new Date();
    let todayTime = "";
    if (dateObject.getHours() < 10) {
      todayTime += "0" + dateObject.getHours() + ":";
    } else {
      todayTime += dateObject.getHours() + ":";
    }
    if (dateObject.getMinutes() < 10) {
      todayTime += "0" + dateObject.getMinutes() + ":";
    } else {
      todayTime += dateObject.getMinutes() + ":";
    }
    if (dateObject.getSeconds() < 10) {
      todayTime += "0" + dateObject.getSeconds();
    } else {
      todayTime += dateObject.getSeconds();
    }
    setCurrentTime(todayTime);
  }
  // 시작 날짜 변경
  function changeStartDate() {
    setStartDate(document.getElementById("startDate").value);
    changeCurrentTime();
  }

  // 종료 날짜 변경
  function changeEndDate() {
    setEndDate(document.getElementById("endDate").value);
    changeCurrentTime();
  }

  function changeDateRange(dateCount) {
    let baseDate = new Date(endDate + " " + currentTime);
    let newStart = new Date(startDate + " " + currentTime);
    if (dateCount === 0) {
      newStart = new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 7);
    } else {
      let newDate = new Date(endDate + " " + currentTime);
      newDate.setMonth(newDate.getMonth() - dateCount);
      newStart = new Date(newDate.getTime());
    }

    let newStartDate =
      newStart.getFullYear() + "-" + monthArray[newStart.getMonth()] + "-";
    if (newStart.getDate() < 10) {
      newStartDate += "0" + newStart.getDate();
    } else {
      newStartDate += newStart.getDate();
    }
    setStartDate(newStartDate);
    // console.log(newStartDate);
  }

  const axios = require("axios");
  useEffect(() => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/store/contributionlist?endDate=${endDate} ${currentTime}&startDate=${startDate} ${currentTime}`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: jwtToken,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setContributions(res.data);
      });
  }, [startDate, endDate]);

  

  
//   setInterval(function(){
//     console.log("INTERVAL")
//   axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_API_URL}/store/contributionlist?endDate=${endDate} ${currentTime}&startDate=${startDate} ${currentTime}`,
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         "Access-Control-Allow-Origin": "*",
//         token: jwtToken,
//       },
//     })
//       .then((res) => {
//         // console.log(res.data);
//         if (res.data.length  !== contributions){
//             setContributions(res.data);        
//         }
        
//       });
// }, 3000)

  const contributionsDate = (contributions.map((item, index) => {
      if(item.itemAvailable > 0){
        let lst = []
        for (let idx=0; idx<item.itemAvailable; idx++){
          if (idx > 12){
            lst.push("...");
            break;
          }
          else{
            lst.push(<FcLike key={idx}/>);
          }
        }
    
        return (
          <Col xs="12" className="row contribution mr-0 ml-0 p-0 mb-3" key={index}>
            <p className="col-5 contributionName mb-0">{item.itemName}</p>
            <p className="col-5 contributionAvailable mb-0">{lst}</p>
            <p className="col-2 contributionCount mb-0 p-1">{item.itemAvailable}</p>
          </Col>
        );
      }    
    }))

  

  return (
    <Col lg="3" xs="12" className="storeMenuList">
      <Card className="storeSupportListContainer col p-0">
        <CardHeader>
          <Row className="justify-content-between pl-3">
            <h5 className="font-weight-bold mt-1">후원현황</h5>
          </Row>
          </CardHeader>
          <CardHeader>
          <Row className="justify-content-around">
            <ButtonGroup className="menuDateButtons mt-2">
              <Button className="menuDateButton" onClick={(e) => changeDateRange(0)}>1주</Button>
              <Button className="menuDateButton" onClick={(e) => changeDateRange(1)}>1달</Button>
              <Button className="menuDateButton" onClick={(e) => changeDateRange(3)}>3달</Button>
              <Button className="menuDateButton" onClick={(e) => changeDateRange(6)}>6달</Button>
            </ButtonGroup>
            <Form className="row mt-4 justify-content-around">
              <FormGroup>
                <Label className="col p-1" for="startDate">시작 날짜</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  placeholder="date placeholder"
                  onChange={changeStartDate}
                  value={startDate}
                />
              </FormGroup>
              <FormGroup>
                <Label className="col p-1 ml-1" for="endDate">종료 날짜</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="date placeholder"
                  onChange={changeEndDate}
                  value={endDate}
                  className="ml-1"
                />
              </FormGroup>
            </Form>
          </Row>
        </CardHeader>
        <CardBody>
          {/* {contributions.map((item, index) => {
            return (
              <Col xs="12" className="row" key={index}>
                <p>{item.itemName}</p>
                <p> {item.itemAvailable}</p>
              </Col>
            );
          })} */}
          {contributionsDate}
        </CardBody>
      </Card>
    </Col>
  );
}

export default StoreSupportList;
