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
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import man from "../../assets/images/dashboard/user.png";
import app, {
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
} from "../../data/base";

function Signin(props) {
  const [email, setEmail] = useState("회원가입시 입력한 아이디, 이메일, 혹은 전화번호를 입력하세요");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(
    localStorage.getItem("Name") || "Elana Saint"
  );
  const [isuser, setisuser] = useState(localStorage.getItem("isUser") || true);

  useEffect(() => {
    localStorage.setItem("profileURL", value);
    localStorage.setItem("Name", name);
    localStorage.setItem("isUser", isuser);
    // eslint-disable-next-line
  }, [value, name, isuser]);

  const loginAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      setValue(man);
      setName("Elana Saint");
      setisuser("true");
      props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "입력한 정보와 비밀번호를 확인해 주세요"
        );
      }, 200);
    }
  };
  const googleAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(googleProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "입력한 정보와 비밀번호를 확인해 주세요"
        );
      }, 200);
    }
  };

  const facebookAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "입력한 정보와 비밀번호를 확인해 주세요"
        );
      }, 200);
    }
  };
  const twitterAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "입력한 정보와 비밀번호를 확인해 주세요"
        );
      }, 200);
    }
  };

  const githubAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(githubProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName("Hardik Parmar");
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "입력한 정보와 비밀번호를 확인해 주세요"
        );
      }, 200);
    }
  };

  return (
<div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/* 전체를 하나의 컨테이너에 담고, fluid => width 100% across all viewport and device size로 설정하기 */}
        {/*  <!-- 로그인 페이지--> */}
        <div className="authentication-main m-0 only-login">
          <Row>
            <Col md="12">
              {/* 전체 div를 하나의 Row와 Col로 감싸도록 설정해두었다.  */}
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody className="h-100-d-center">
                    <div className="cont text-center b-light">
                      <div>
                        <Form className="theme-form">
                          <h4>로그인</h4>
                          <h6>-</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              아이디
                            </Label>
                            <Input
                              className="form-control"
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email address"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">비밀번호</Label>
                            <Input
                              className="form-control"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">내 정보 기억하기</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            {loading ? (
                              <Button
                                color="warning btn-block"
                                disabled={loading}
                              >
                                잠시만 기다려 주세요...
                              </Button>
                            ) : (
                              <Button
                                color="warning btn-block"
                                onClick={(event) => loginAuth(event)}
                              >
                                로그인
                              </Button>
                            )}
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="6" sm="6">
                                <Button
                                  color="social-btn btn-kakao"
                                  // social-btn은 _forms.scss에서 찾을 수 있다!
                                  onClick={facebookAuth}
                                >
                                  카카오로 로그인하기
                                </Button>
                              </Col>
                              <Col md="6" sm="6">
                                <Button
                                  color="social-btn btn-naver"
                                  onClick={twitterAuth}
                                >
                                  네이버로 로그인하기
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h2>내 후원정보를 알고 싶으세요?</h2>
                            <p>
                              회원가입을 하시고, 내 후원 정보를 확인해 보세요! 
                              후원은 회원가입 없이도 가능합니다.
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>
                              If you already has an account, just sign in. We've
                              missed you!
                            </p>
                          </div>
                          <div className="img__btn">
                            <span className="m--up">회원가입</span>
                            <span className="m--in">Sign in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ToastContainer />
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Signin;
