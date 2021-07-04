/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardFooter,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { FcLock } from "react-icons/fc";

function QnaList() {
  let [qnaList, setQnaList] = useState([]);
  let userStatus = useState(Boolean(localStorage.getItem("access-token")));
  let [user, setUser] = useState([]);
  let [totalPages, setTotalPages] = useState(0);
  let [nowPage, setNowPage] = useState(0);

  useEffect(() => {
    if (userStatus) {
      fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
        headers: {
          token: localStorage.getItem("access-token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          console.log(res);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/qna/0`)
      .then((res) => res.json())
      .then((res) => {
        setQnaList(res.content);
        setTotalPages(res.totalPages);
      });
  }, []);

  const qnas = qnaList.map((qna, index) => {
    let qnadate = new Date(qna.qnaDate);
    // qnadate.setHours(qnadate.getHours()+9)
    // console.log(qnadate)
    return (
      <tr
        key={index}
        className={user.userId === qna.user.userId ? "myQna" : ""}
      >
        <th scope="row" width="10%">
          {qna.qnaSeq} {qna.qnaSecret ? <FcLock /> : ""}
        </th>
        <td
          width="40%"
          onClick={(e) => Detail(qna)}
          style={{ cursor: "pointer" }}
          className="text-truncate"
        >
          {qna.qnaTitle}
        </td>
        <td width="20%">{qna.user.userName}</td>
        <td width="20%">
          {qnadate.getFullYear() +
            "-" +
            (qnadate.getMonth() + 1) +
            "-" +
            qnadate.getDate()}
        </td>
        <td width="10%">{qna.qnaReply == null ? "X" : "O"}</td>
      </tr>
    );
  });

  const Detail = (qna) => {
    fetch(`${process.env.REACT_APP_API_URL}/qna/read`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qnaSeq: qna.qnaSeq,
        qnaSecret: qna.qnaSecret,
      }),
    }).then((res) => {
      if (res.headers.get("content-type") === null) {
        alert("타인이 작성한 비밀글은 볼 수 없어요.");
      } else {
        res.json().then((res) => {
          window.history.pushState(res, "please", "/qnadetail");
          window.location.href = "/qnadetail";
        });
      }
    });
  };

  const paginations = [];

  for (let idx = 1; idx <= totalPages; idx++) {
    paginations.push(
      <PaginationItem key={idx - 1}>
        <PaginationLink
          className={nowPage === idx - 1 ? "active" : ""}
          href="#javascript"
          onClick={(e) => Page(idx - 1)}
        >
          {idx}
        </PaginationLink>
      </PaginationItem>
    );
  }

  const Page = (idx) => {
    fetch(`${process.env.REACT_APP_API_URL}/qna/${idx}`)
      .then((res) => res.json())
      .then((res) => {
        setQnaList(res.content);
        setNowPage(idx);
      });
  };

  return (
    <Fragment>
      <Container fluid={true} className="listPost">
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
            <h3 className="col-8 d-inline">문의 내역</h3>
            <div className="col-4 d-inline">
              {userStatus ? (
                <a href="/qnacreate">
                  <Button className="listPostHeaderButton">문의하기</Button>
                </a>
              ) : (
                <div className="listPostHeaderCaution">
                  <b>회원만 문의가 가능합니다</b>
                </div>
              )}
            </div>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card className="listPostContent">
              <div className="listPostBody">
                <Table hover>
                  <thead className="listPostBodyThead">
                    <tr>
                      <th scope="col" width="10%">
                        번호
                      </th>
                      <th scope="col" width="40%">
                        제목
                      </th>
                      <th scope="col" width="20%">
                        이름
                      </th>
                      <th scope="col" width="20%">
                        작성일
                      </th>
                      <th scope="col" width="10%">
                        답변
                      </th>
                    </tr>
                  </thead>
                  <tbody className="listPostBodyTbody">
                    {qnas}
                    {/* {qnaList.map((qna, index) => (
                      <tr
                        key={index}
                        className={
                          user.userId === qna.user.userId ? "myQna" : ""
                        }
                      >
                        <th scope="row">
                          {qna.qnaSeq} {qna.qnaSecret ? <FcLock /> : ""}
                        </th>
                        <td
                          onClick={(e) => Detail(qna)}
                          style={{ cursor: "pointer" }}
                        >
                          {qna.qnaTitle}
                        </td>
                        <td>{qna.user.userName}</td>
                        <td>{qna.qnaDate.slice(0, 10)}</td>
                        <td>{qna.qnaReply == null ? "X" : "O"}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </Table>
              </div>
              <CardFooter className="listPostFooter row">
                <Pagination size="sm" className="col">
                  <ul className="pagination">{paginations}</ul>
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default QnaList;
