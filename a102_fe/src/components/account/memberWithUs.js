import React, { Fragment, useState, useEffect } from "react";
// import {
//   Col,
//   // Card,
//   CardHeader,
//   CardBody,
//   // Button,
//   // Media,
//   // Form,
//   // FormGroup,
//   // Input,
//   Collapse,
//   // UncontrolledTooltip,
// } from "reactstrap";
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
//   const [withus, setwithus] = useState(true);

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
      // console.log("지금 받아올 내용은:", res)
      // console.log("실제로 받은 내용은:", userInfo)
      
    })
    fetch(`${process.env.REACT_APP_API_URL}/account/userwithus`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserWithus(res);
      // console.log("지금 받아올 내용은:", res)
      // console.log("실제로 받은 내용은:", userWithus)
    })
  }, [])

  return (
    <Fragment>
      <div className="memberInfo">
        <div className="memberInfoHeaderCard"
        >
          <div className="withUsContainer">
            <div className="withUsTitle">
              { userWithus.userWithUs } 
            </div>
            <div className="withUsSubTitle">일</div>
          </div>
          <div className="withUsExplain">동안 우리끼니와</div>
        </div>
        <div className="memberInfoHeaderCard"
        >
          <div className="withUsContainer">
            <div className="withUsTitle">
              { userWithus.contributionCount } 
            </div>
            <div className="withUsSubTitle">그릇</div>
          </div>
          <div className="withUsExplain">을 함께했고</div>
        </div>
        <div className="memberInfoHeaderCard"
        >
          <div className="withUsContainer">
            <div className="withUsTitle">
              { userWithus.contributionTotal } 
            </div>
            <div className="withUsSubTitle">원</div>
          </div>
          <div className="withUsExplain">을 후원했어요</div>
        </div>
      </div>
    </Fragment>
  );

  // return (
  //   <Fragment>
  //     <Col xl="12" className="memberInfo">
  //       <div className="card">
  //         <CardHeader className="memberInfo-header">
  //           <h5 className="mb-0">
  //             <div className="memberInfo-title"
  //               // color="link pl-0"
  //               // 기본값은 withus가 true인 상태입니다. 즉 내용이 열려있어요! => isOpen값으로 받아서 그래요
  //               // 그러나 온클릭시 setwithus를 이용해 이를 뒤집어(!) 줍니다. 
  //               onClick={() => setwithus(!withus)}
  //               data-toggle="collapse"
  //               data-target="#collapseicon5"
  //               // withus가 true인 경우 aria가 expanded 된 상태라는 뜻이에요. 
  //               // 그런데 이 줄이 빠지더라도 작동하고 있어요! 왜인지 살펴보고 싶어요. 
  //               // aria-expanded={withus}
  //               aria-controls="collapseicon5"
  //             >
  //               { userInfo.userName }님
  //             </div>
  //           </h5>
  //         </CardHeader>
  //         {/* 마찬가지로 withus가 true인 기본값일 때 isOpen 됩니다. 
  //         짐작해보는데, aria-expand와 Collapse는 쌍으로 묶이는 것 같아요. => 아닌거같아요
  //         isOpen은 말 그대로 보여주냐 마느냐입니다. boolean을 받아요! 헐! 
  //         만약 withus라는 변수를 쓰지 않고 T/F를 매긴다면, 늘 고정된 상태가 돼요.*/}
  //         <Collapse isOpen={withus}>
  //           <CardBody className="memberInfo-body">
  //             <p>{ userWithus.userWithUs }일째 함께하고 있어요</p>
  //             <p>{ userWithus.contributionCount }그릇을 함께 했어요</p>
  //             ----
  //             <p>{ userWithus.contributionTotal }원</p>
  //             <span>
  //               <button type="button">기부 영수증 발급</button>
  //             </span>
  //           </CardBody>
  //         </Collapse>
  //       </div>
  //     </Col>
  //   </Fragment>
  // );
};

export default MemberInfo;
