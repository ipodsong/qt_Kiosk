import React, { Fragment, useState } from "react";
import CKEditor from "ckeditor4-react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function QnaUpdate() {
  let qna = useState(window.history.state);
  let [title, setTitle] = useState(window.history.state.qnaTitle);
  let [content, setContent] = useState(window.history.state.qnaContent);
  let [secret, setSecret] = useState(0);

//   useEffect(() => {
//     console.log("title", title);
//     console.log("content", content);
//   });

  const Update = (event) => {
    event.preventDefault();
    // console.log(title);
    // console.log(content);
    // console.log(secret);
    fetch(`${process.env.REACT_APP_API_URL}/qna/update`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("access-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qnaSeq: qna.qnaSeq,
        qnaTitle: title,
        qnaContent: content,
        qnaSecret: secret,
      }),
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/qna";
      } else {
        alert("글 수정에 실패하셨습니다. 다시 시도해주세요.");
      }
    });
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onContentChange = (event) => {
    const data = event.editor.getData();
    setContent(data);
  };

  const onSecretChange = (event) => {
    if (secret === 0) {
      setSecret(1);
    } else {
      setSecret(0);
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="createPost">
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
            <h3 className="col-8 d-inline">문의 수정하기</h3>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card>
              {/* <CardHeader className="createPostHeader">
                <h5>문의하기</h5>
              </CardHeader> */}
              <CardBody className="createPostBody">
                <Form className="row">
                  <Col sm="12">
                    <FormGroup>
                      <Label for="qnaTitle">제목</Label>
                      <Input
                        className="createTitle"
                        type="text"
                        name="title"
                        value={title}
                        placeholder="제목을 입력해주세요 :)"
                        required=""
                        onChange={onTitleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>내용</Label>
                      <CKEditor
                        activeclassName="p10"
                        name="content"
                        id="content"
                        value={content}
                        data={content}
                        required=""
                        onChange={onContentChange}
                      />
                    </FormGroup>
                    <FormGroup check className="d-inline">
                      <Label check>
                        <Input
                          type="checkbox"
                          name="secret"
                          value={secret}
                          onChange={onSecretChange}
                        />
                        비밀글
                      </Label>
                    </FormGroup>
                    <Button className="createButton" type="submit" onClick={Update}>
                      수정하기
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default QnaUpdate;
