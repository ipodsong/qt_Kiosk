import React, { Fragment, useState, useEffect } from "react";
import { Col, CardHeader, CardBody, Button } from "reactstrap";

function MemberQnA() {
  let [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/qna/mypage`, {
      headers: {
        token: localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setQnaList(res);
        console.log("c", res.content);
        // $( document ).ready( function() {
        //   $( 'div' ).html( '<p>Aenean nec mollis.</p>' );
        // } );
      });
  }, []);

  const Detail = (qna) => {
    // console.log(qna);
    // fetch(`http://i4a102.p.ssafy.io:8080/app/qna/read`, {
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
          // alert("공개글이니까 혹은 내가 쓴 거니까 볼 수 있지");
          window.history.pushState(res, "please", "/qnadetail");
          window.location.href = "/qnadetail";
        });
      }
    });
  };

  return (
    <Fragment>
      <Col xl="12" className="qnaInfo mt-2 p-0">
        <div className="card">
          <CardHeader className="qnaInfoHeader">
            <h5 className="mb-0">
              <div className="qnaInfoTitle">문의 내역</div>
            </h5>
          </CardHeader>
          <CardBody className="qnaInfoBody p-0 pt-2">
            {qnaList.map((qna, index) => (
              <p key={index} className="d-flex col-12 row m-0 pt-2">
                <p className="memberQnaTitle col-9 text-truncate mb-0">
                  {qna.qnaTitle
                    .replace(/<br\/>/gi, "\n")
                    .replace(
                      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                      ""
                    )
                    .replace(/(<([^>]+)>)/gi, "")
                    .replace(/&nbsp;/gi, "")}
                </p>
                <Button className="col-3" onClick={(e) => Detail(qna)}>
                  글 보기
                </Button>
              </p>
            ))}
          </CardBody>
        </div>
      </Col>
    </Fragment>
  );
}

export default MemberQnA;
