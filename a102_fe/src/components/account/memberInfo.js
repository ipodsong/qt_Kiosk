import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  // Card,
  CardHeader,
  CardBody,
  // Button,
  // Media,
  // Form,
  // FormGroup,
  // Input,
  Collapse,
  // UncontrolledTooltip,
} from "reactstrap";
// import one from "../../assets/images/user/2.jpg";
// import three from "../../assets/images/user/3.jpg";
// import five from "../../assets/images/user/5.jpg";
// import two from "../../assets/images/user/2.png";
// import eight from "../../assets/images/user/8.jpg";
// import eleven from "../../assets/images/user/11.png";
// import timeline3 from "../../assets/images/social-app/timeline-3.png";
// import ten from "../../assets/images/user/10.jpg";
// import six from "../../assets/images/user/6.jpg";
// import fourteen from "../../assets/images/user/14.jpg";
// import four from "../../assets/images/user/4.jpg";

function MemberInfo() {
  // 이하 내역을 보여주기 위해 withus 영역을 정의하고 토글할 계획입니다.
  // 우선 useState로 해당 영역과 관련된 함수를 정의해줍시다!
  const [withus, setwithus] = useState(true);

  const [userInfo, setuserInfo] = useState({});
  const [userWithus, setuserWithus] = useState({});

  // const [isMutual, setisMutual] = useState(true);
  // const [isActivity, setisActivity] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);
    //   console.log("지금 받아올 내용은:", res)
    //   console.log("실제로 받은 내용은:", userInfo)
      
    })
    fetch(`${process.env.REACT_APP_API_URL}/account/userwithus`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserWithus(res);
    //   console.log("지금 받아올 내용은:", res)
    //   console.log("실제로 받은 내용은:", userWithus)
    })
  }, [])

  // fetch로 userWithus도 받아와야해요!

  // const userInfo = {
  //   "userSeq": 1,
  //   "userId": "1",
  //   "userName": "qwe",
  //   "userPwd": null,
  //   "userEmail": "test@test.com",
  //   "userPhone": "010-0000-0000",
  //   "userDate": "2021-01-26T04:17:27",
  //   "userTotalContributionAmount": 20,
  //   "store": null
  // };

  // const userWithus = {
  //   "userWithUs": 1,
  //   "contributionCount": 6,
  //   "contributionTotal": 20
  // }

  return (
    <Fragment>
      <Col xl="12" className="memberInfo">
        <div className="card">
          <CardHeader className="memberInfo-header">
            <h5 className="mb-0">
              <div className="memberInfo-title"
                onClick={() => setwithus(!withus)}
                data-toggle="collapse"
                data-target="#collapseicon5"
                aria-controls="collapseicon5"
              >
                { userInfo.userName }님
              </div>
            </h5>
          </CardHeader>
          <CardBody className="memberInfo-body">
            <p>{ userWithus.userWithUs }일째 함께하고 있어요 </p>
            <p>{ userWithus.contributionCount }그릇을 함께 했어요</p>
            ----
            <p>{ userWithus.contributionTotal }원</p>
            <span>
              <button type="button">기부 영수증 발급</button>
            </span>
          </CardBody>
        </div>
      </Col>
    </Fragment>
  );
};

export default MemberInfo;
