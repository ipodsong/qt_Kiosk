import React, { Fragment, useState } from "react";
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

function MenuCreate() {
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [img, setImage] = useState(null);

  const Create = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("itemName", name);
    formData.append("itemPrice", price);
    formData.append("file", img);

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    // for (let value of formData.values()) {
    //   console.log(value);
    // }

    fetch(`${process.env.REACT_APP_API_URL}/store/item/create`, {
      method: "POST",
      headers: {
        // token: localStorage.getItem('access-token'),
        // "Content-Type": "multipart/form-data",
        token:
        `${process.env.REACT_APP_STORE_TOKEN}`,
      },
      body: formData,
    }).then((res) => {
      //   console.log(res);
      if (res.status === 200) {
        // alert("9ㅜㄷ 9ril~ 관리자 뷰로 보내줘 나를!!");
        window.location.href = "/storeadmin";
      } else {
        alert("메뉴 생성에 실패하셨습니다. 다시 시도해주세요.");
      }
    }).catch((err)=>alert(err));
  };

  const onNameChange = (event) => {
    setName(event.target.value);
    // console.log(event.target.value);
  };

  const onPriceChange = (event) => {
    setPrice(event.target.value);
    // console.log(event.target.value);
  };

  const onImgChange = (event) => {
      console.log(event.target.files[0])
    setImage(event.target.files[0]);
    // console.log(event.target.files[0]);
  };

  return (
    <Fragment>
      <Container fluid={true} className="createPost">
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} id="storetitle">
            <h3 className="col-8 d-inline">메뉴 추가하기</h3>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card>
              {/* <CardHeader className="createPostHeader">
                <h5>메뉴 추가하기</h5>
              </CardHeader> */}
              <CardBody className="createPostBody">
                <Form className="row" enctype="multipart/form-data">
                  <Col sm="12">
                    <FormGroup>
                      <Label for="menuName">상품명</Label>
                      <Input
                        className="createTitle"
                        type="text"
                        name="name"
                        value={name}
                        onChange={onNameChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="menuPrice">가격</Label>
                      <Input
                        className="createTitle"
                        type="number"
                        name="price"
                        value={price}
                        onChange={onPriceChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="menuImg">사진</Label>
                      <Input
                        className="createTitle"
                        type="file"
                        accept="image/jpg,impge/png,image/jpeg,image/gif"
                        name="file"
                        onChange={onImgChange}
                      />
                    </FormGroup>
                  </Col>
                </Form>
                <Button
                  className="createMenuButton"
                  type="submit"
                  onClick={Create}
                >
                  추가
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default MenuCreate;
