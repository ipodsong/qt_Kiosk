import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import KakaoAuth from "../../components/account/kakaoAuth";
import NaverAuth from "../../components/account/naverAuth";
import NaverAuthButton from "../../assets/images/naverAuth/NaverLoginButton.png";
import oori from "../../assets/images/oori.png";

function Auth(props) {
  const toggleform = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  };

  const NaverAuthClick = (event) => {
    event.preventDefault();
    document.getElementById("naverIdLogin_loginButton").click();
  }; 
  
  // 로그인
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const Signin = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/account/signinjwt`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: loginId,
        userPwd: loginPassword
      })
    })
    .then(res => res.json())
    .then(res => {
      // 여기도 분기 걸어서 로그인 에러 처리 
      localStorage.setItem('access-token', res["token"])
      fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
        headers: {
          token: localStorage.getItem('access-token')
        }
      })
      .then(res => res.json())
      .then(res =>{
        ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' )
      } 
      )  
    })
    .catch(error =>{
        console.log(error);
      alert("아이디와 비밀번호를 확인해주세요!")
    }
    )
  };

  // 회원가입
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkid, setCheckid] = useState(false);
  const [checkphone, setCheckphone] = useState(false);
  const [checkmail, setCheckmail] = useState(false);

  function digitcheck(value) {
    var digit = value.charAt(value.length-1)

    const regexdigit = /^[0-9\b -]$/;
    (regexdigit.test(digit) || !Boolean(digit) ) ? (console.log("숫자이거나 빈칸입니다")) : (alert("숫자만 입력하세요!"))

    const regexphone = /^[0-9\b -]{10,11}$/;
    (regexphone.test(value)) ? (setCheckphone(true)) : (setCheckphone(false))

  };

  function mailcheck() {
    var mail = email;
    const regexmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    (regexmail.test(mail)) ? (setCheckmail(true)) : (setCheckmail(false));
  
  };
  
  let [popupModal, setPopupModal] = useState(false);
  let popupToggle = () => setPopupModal(!popupModal);

  const CheckPopup = () => {

    console.log("im in popup and", popupModal)
  
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
            <Button className="AgreeButton" onClick={(e) => {popupToggle(); Signup();}}>동의합니다.</Button>
            <Button className="NoButton" onClick={(e) => {popupToggle();}}>다음에 가입할게요.</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  const SignupCheck = (event) => {
    // event.preventDefault();
    if (Boolean(name) === false || Boolean(phone) === false || Boolean(email) === false || Boolean(password) === false) {
      alert("정보를 빠짐없이 채워주세요!")
    } else if (checkid === false) {
      alert("중복 확인을 해주세요!")
    } else if (checkphone !== true) {
      alert("전화번호를 확인하세요!")
    } else if (checkmail !== true) {
      alert("이메일 주소를 확인하세요!")
    } else { 
      popupToggle();
    }
  }

  const Signup = (event) => {
    // event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/account/signup`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        userName: name,
        userPhone: phone,
        userEmail: email,
        userPwd: password,
      })
    })
    .then(res => {
      // 받아진 응답을 확인합시다! 이 응답은 httpOK이거나 아닐 예정입니다. 이 안에서 if로 분기를 나눠볼게요! 
      // console.log("Signup의 응답은:", res)
      // res가 NULL이거나 badrequest 인 경우 에러메시지 출력 대비
      // 정상적으로 OK 받는다면 : 방금 입력받은 유저 정보를 다시 보내서 JWT를 받아오자! 자동 로그인 파트
      if (res.status === 200 || res.status === 201) {
        // fetch(`${process.env.PUBLIC_URL}/account/signinjwt`), {
        fetch(`${process.env.REACT_APP_API_URL}/account/signinjwt`, {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },   
          body: JSON.stringify({
            userId: id,
            userPwd: password,
          })
        })
        .then(res => res.json())
        .then(res => {
          // console.info("Signup 함수 성공한 경우 자동 로그인:", res)
          localStorage.setItem('access-token', res.token)
        })
        .then(() => {
          // 회원가입 후 바로 로그인을 실행했다면? 
          if (Boolean(localStorage.getItem('access-token')) == true && localStorage.getItem('access-token') != "undefined") {

            //storeId일 경우에는?
            fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
              headers: {
                token: localStorage.getItem('access-token')
              }
            })
            .then(res => res.json())
            .then(res =>
              ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' )        
            )  
          }
        })
      } else {
        // 회원가입이 실패한 경우인데, 어떤 경우가 있을까요? 같이 에러처리 합시다
        alert('회원가입에 실패하셨습니다. 이메일과 연락처를 다시 확인해주세요.')
        // console.error("회원가입이 실패한 경우:", res)
      }
    }
    )
  }

  const Checkid = () => {
    // (id == "") ? alert("아이디를 입력해주세요") : Checkid()}
    fetch(`${process.env.REACT_APP_API_URL}/account/userdupli`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
      })
    })
    .then(res => {
      if (res.status === 200) {
        // console.log("중복확인:", res),
        alert("사용 가능한 아이디입니다")
        setCheckid(true)
      } else {
        // console.log("중복확인 에러:", res),
        alert("이미 존재하는 아이디입니다")
      }
    })
  };

  return (
    <div className="mainAuth">
    <div className="page-wrapper">
      <Container fluid={true} className="authentication-wrapper p-0">
        {/* <!-- login page start--> */}
        <div className="authentication-main">
          <Row className="authentication-body">
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody>
                    <div className="cont text-center !s--signup">
                      <div>
                        <Form className="theme-form">
                          <h4>로그인</h4>
                          {/* <h6>아이디와 비밀번호를 입력해 주세요</h6> */}
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              아이디
                            </Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="loginid"
                              value={loginId}
                              onChange={(e) => setLoginId(e.target.value)}
                              placeholder="아이디를 입력하세요"
                              // 필수인자 받아볼것!
                              required
                              // className="btn-pill"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">비밀번호</Label>
                            <Input
                              className="form-control"
                              type="password"
                              name="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="비밀번호를 입력하세요"
                              required
                              // className="btn-pill"
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">정보 기억하기</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            <Button 
                              color="warning btn-block"
                              onClick={(event) => Signin(event)}
                            >
                              로그인
                            </Button>
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="6" sm="6">
                                <KakaoAuth />
                              </Col>
                              <Col md="6" sm="6">
                                <NaverAuth />
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h4>회원가입을 하시고</h4>
                            <p> </p>
                            <p>
                              아이들에게
                            </p>
                            <p>
                              따뜻한 한 끼를 나눠주세요
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h4>이미 회원이시라면</h4>
                            <p> </p>
                            <p>
                              로그인 하시고
                            </p>
                            <p>
                              내 후원 내역을 확인하세요
                            </p>
                          </div>
                          <div className="img__btn" onClick={toggleform}>
                            <span className="m--up">회원가입</span>
                            <span className="m--in">로그인</span>
                          </div>
                        </div>
                        <div>
                          <Form className="theme-form">
                            <h4 className="text-center">회원가입</h4>
                            <Row form>
                              <Col md="9">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={(e) => {setId(e.target.value); setCheckid(false);}}
                                    placeholder="아이디를 입력하세요"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <Button
                                  // setId가 되지 않아서 id의 상태가 ""일 경우에는 클릭해도 오류가 뜨도록 분기를 생성해보자
                                  onClick={() => 
                                    (id == "") ? alert("아이디를 입력해주세요") : Checkid()}
                                >
                                  중복확인
                                </Button>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="이름을 입력하세요"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => {setPhone(e.target.value); digitcheck(e.target.value); }}
                                    placeholder="전화번호를 숫자로만 입력하세요(01012341234)"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Input
                                className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value); mailcheck();}}
                                placeholder="이메일을 입력하세요"
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="form-row mt-3 mb-0">
                              <Button color="primary btn-block"
                                color="warning btn-block"
                                onClick={(event) => {SignupCheck(event)}}                              
                              > 
                              회원가입
                              </Button>
                              <CheckPopup />
                            </FormGroup>
                            <div className="form-divider"></div>
                            <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="6" sm="6">
                                <KakaoAuth />
                              </Col>
                              <Col md="6" sm="6">
                                <div id="naverIdLogin">
                                  <img
                                    src={ NaverAuthButton } 
                                    className="naverAuthBtn"
                                    onMouseOver=""
                                    onClick={(event) => NaverAuthClick(event)}
                                  />                                  
                                </div>
                              </Col>
                            </Row>
                          </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <!-- login page end--> */}
      </Container>
    </div>
    </div>
  );
}

export default Auth;
