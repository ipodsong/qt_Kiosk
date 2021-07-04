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

function MenuUpdate() {
  let menu = useState(window.history.state);
  let [name, setName] = useState(window.history.state.itemName);
  let [price, setPrice] = useState(window.history.state.itemPrice);
  let [img, setImage] = useState(window.history.state.files);
  let [imgUrl, setImgUrl] = useState(window.history.state.itemImgUrl);

  const Update = (event) => {
    event.preventDefault();
    console.log(menu[0])

    const formData = new FormData();
    formData.append("itemId", menu[0].itemId);
    formData.append("itemName", name);
    formData.append("itemPrice", price);
    formData.append("file", img);
    formData.append("itemImgUrl", imgUrl);

    console.log(menu[0].itemId)

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    // for (let value of formData.values()) {
    //   console.log(value);
    // }

    fetch(`${process.env.REACT_APP_API_URL}/store/item/update`, {
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
        alert("메뉴 수정에 실패하셨습니다. 다시 시도해주세요.");
      }
    }).catch((err)=> console.log(err));
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
    setImage(event.target.files[0]);
    // console.log(event.target.files[0]);
  };

  const DeleteImg = (event) => {
    setImgUrl("noImage");
  };

  return (
    <Fragment>
      <Container fluid={true} className="createPost">
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }} id="storetitle">
            <h3 className="col-8 d-inline">메뉴 수정하기</h3>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card>
              {/* <CardHeader className="createPostHeader">
                <h5>메뉴 수정하기</h5>
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
                      <Label for="menuImg">사진 {imgUrl}</Label>
                      <Button className="deletePhotoButton" onClick={DeleteImg}>
                        삭제
                      </Button>
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
                  onClick={Update}
                >
                  수정
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default MenuUpdate;
