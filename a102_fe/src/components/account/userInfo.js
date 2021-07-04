import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import oori from "../../assets/images/oori.png";


function UserInfo() {
  const [userInfo, setuserInfo] = useState({});
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [button, setButtton] = useState(true);  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);
      setEmail(res.userEmail);
      setPhone(res.userPhone);
    })
  }, [])

  const UpdateCheck = (event) => {
    const regex = /^[0-9\b -]{10,11}$/;
    const regexmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    (!(regex.test(phone)) || phone.trim() === "") ?
      alert("연락처는 10-11자리 번호만 입력해주세요!")
    :
    (!(regexmail.test(email)) || email.trim() === "") ?
      alert("이메일 형식을 확인해주세요!")
    :
    popupToggle();
  }

  const userUpdate  = (event) => {
    console.log("update");
    if (phone === userInfo.userPhone){
      phone = null;
    }
    if (email === userInfo.userEmail){
      email = null;
    }
    fetch(`${process.env.REACT_APP_API_URL}/account/update`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhone: phone,
        userEmail: email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setButtton(!button);
        fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
          headers: {
            token: localStorage.getItem('access-token')
          }
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setuserInfo(res);
        })
      } else {
        alert("회원정보 수정에 실패하셨습니다. 다시 시도해주세요.");
      }
    })
  };

  const userButton = (event) => {
    setButtton(!button);
  }

  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  let [popupModal, setPopupModal] = useState(false);
  let popupToggle = () => setPopupModal(!popupModal);

  const CheckPopup = () => {

    // console.log("im in popup and", popupModal)
  
    return (
      <div>
        <Modal isOpen={popupModal} className="checkPopup">
          <ModalHeader><img src={oori}/>[개인정보 수집 및 이용 동의]</ModalHeader>
          <ModalBody>
            우리끼니는 다음과 같이 개인정보를 수집 및 이용하고 있습니다.
            <br/><br/>
            수집 및 이용 목적: 회원 가입, 이용자 식별, 서비스 이용 안내<br/>
            항목: ID, 닉네임, 비밀번호, 휴대폰 번호, 이메일주소<br/>
            보유 및 이용기간: 회원탈퇴일로부터 30일 (법령에 특별한 규정이 있을 경우 관련 법령에 따라, 부정이용기록은 회원탈퇴일로부터 1년)<br/>
            동의를 거부할 경우 회원가입이 불가능 합니다.
            <br/><br/>
            ※ 그 외의 사항 및 자동 수집 정보와 관련된 사항은 개인정보처리방침을 따릅니다.
          </ModalBody>
          <ModalFooter>
            <Button className="AgreeButton" onClick={(e) => {popupToggle(); userUpdate();}}>동의합니다.</Button>
            <Button className="NoButton" onClick={(e) => {popupToggle(); userButton();}}>다음에 수정할게요.</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  if (button){
    return (
      <Fragment>
        <Col xl="12" className="userInfo mt-2 p-0 m-0">
          <Card>
            <CardHeader className="userInfoHeader">
              <h5 className="mb-0">
                회원정보 <Button onClick={userButton}> 수정 </Button>
              </h5>
            </CardHeader>
            <CardBody className="userInfoBody">
                <p><AiFillPhone />  { userInfo.userPhone==="temp"? "번호를 입력해주세요." : userInfo.userPhone } </p>
                <p className="mb-0"><AiOutlineMail />  { userInfo.userEmail==="temp"? "이메일을 입력해주세요." : userInfo.userEmail} </p>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
  else{
    return(
      <Fragment>
        <Col xl="12" className="userInfo mt-2 p-0 m-0">
          <Card>
            <CardHeader className="userInfoHeader">
              <h5 className="mb-0">
                회원정보 <Button onClick={UpdateCheck}>완료</Button>
              </h5>
              <CheckPopup/>
            </CardHeader>
            <CardBody className="userInfoBody">
                <p>
                  <AiFillPhone />
                  <Input
                    className="d-inline userInfoInput"
                    type="text"
                    name="userPhone"
                    required=""
                    value={phone}
                    onChange={onPhoneChange}
                  />
                </p>
                <p className="mb-0">
                  <AiOutlineMail />
                  <Input
                    className="d-inline userInfoInput"
                    type="text"
                    name="userEmail"
                    required=""
                    value={email}
                    onChange={onEmailChange}
                  />
                </p>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
};

export default UserInfo;
