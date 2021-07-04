/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import FaceIcon from '@material-ui/icons/Face';
import ReactHtmlParser from 'react-html-parser';


function QnaDetail() {
    let [qna, setQna] = useState([]);
    // let [qnaDate, setQnaDate] = useState("");
    let [qnauser, setQnaUser] = useState("");
    let [user, setUser] = useState([]);
    let userStatus = useState(Boolean(localStorage.getItem("access-token")));

    useEffect(() => {
        if(userStatus) {
            fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
                headers: {
                    token: localStorage.getItem('access-token')
                }
            })
            .then(res => res.json())
            .then(res => {
                setUser(res);
            })
        }
    }, [])

    useEffect(() => {
        setQna(window.history.state);
        // setQnaDate(window.history.state.qnaDate.slice(0,10));
        setQnaUser(window.history.state.user);
    }, [])

    const Back = (event) => {
        window.location.href = '/qna';
    }

    const Update = (event) => {
        event.preventDefault();
        window.history.pushState(qna, 'please', '/qnaupdate');
        window.location.href = '/qnaupdate';
    }

    const Delete = (event) => {
        event.preventDefault();
        if(window.confirm("정말로 글을 삭제하시겠습니까? \n삭제된 글은 복구 할 수 없습니다.")) {
            fetch(`${process.env.REACT_APP_API_URL}/qna/delete/${qna.qnaSeq}`, {
                method: "POST",
                headers: {
                    token: localStorage.getItem('access-token'),
                },
            }).then(res => {
                if (res.status === 200) {
                    // alert("삭제 성공", qna.qnaSeq);
                    window.location.href = '/qna';
                }
                else{
                    alert("글 삭제에 실패했습니다. 다시 한 번 시도해주세요:)");
                }
            })
        }
    }
    
    let qnadate = new Date(qna.qnaDate);

    return (
        <Fragment>
            <Container fluid={true} className="detailPost">
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
                        <h3 className="col-8 d-inline">문의 내역</h3>
                        <div className="col-4 d-inline detailPostButton">
                        {/* <Button className="detailPostUpdateButton ml-1" onClick={(e) => Update(e)}>수정하기</Button> */}
                                {qnauser.userId === user.userId && qna.qnaReply!=null?
                                <span>
                                <Button className="detailPostDeleteButton ml-1" onClick={(e) => Delete(e)}>삭제하기</Button>
                                </span>
                                :
                                qnauser.userId === user.userId?
                                <span>
                                <Button className="detailPostDeleteButton ml-1" onClick={(e) => Delete(e)}>삭제하기</Button>
                                <Button className="detailPostUpdateButton ml-1" onClick={(e) => Update(e)}>수정하기</Button>
                                </span>
                                :
                                ""
                            }
                            <Button className="detailPostBackButton ml-1" onClick={(e) => Back(e)}>목록으로가기</Button>
                        </div>
                    </Col>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <Card>
                            <CardHeader className="detailPostQHeader">
                                <h5>{qna.qnaTitle}</h5>
                                < FaceIcon /> {qnauser.userName}
                                <span>{qnadate.getFullYear() + "-" + (qnadate.getMonth()+1) + "-" + qnadate.getDate()}</span>
                            </CardHeader>
                            <CardBody className="detailPostQBody">
                                <p>
                                    {ReactHtmlParser(qna.qnaContent)}
                                </p>
                            </CardBody>
                            <CardHeader className="detailPostAHeader">
                                <h5 className="mb-0">답변</h5>
                            </CardHeader>
                            <CardBody className="detailPostABody">
                                <p>
                                {qna.qnaReply? qna.qnaReply.replyContent : "조금만 기다려주세요, 빠르게 응답드리겠습니다."}
                                </p>
                            </CardBody>
                            {/* <CardFooter className="detailPostButton">
                                <Button className="detailPostBackButton" onClick={(e) => Back(e)}>목록으로가기</Button>
                                {qnauser.userId === user.userId && qna.qnaReply!=null?
                                <span>
                                <Button className="detailPostDeleteButton" onClick={(e) => Delete(e)}>삭제하기</Button>
                                </span>
                                :
                                qnauser.userId === user.userId?
                                <span>
                                <Button className="detailPostDeleteButton" onClick={(e) => Delete(e)}>삭제하기</Button>
                                <Button className="detailPostUpdateButton" onClick={(e) => Update(e)}>수정하기</Button>
                                </span>
                                :
                                ""
                                }
                            </CardFooter> */}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default QnaDetail;