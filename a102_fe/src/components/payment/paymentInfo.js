/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Button, CardBody, Card, CardHeader } from "reactstrap";
import { useState, useEffect } from "react";

function PaymentInfo({ sendDataToParent }) {
  let [cartStorage, setCartStorage] = useState(
    localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : []
  );
  let [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("price")
      ? JSON.parse(localStorage.getItem("price"))
      : 0
  );
  let [trigger, setTrigger] = useState(false);

  function calculateTotal() {
    let total = 0;
    cartStorage.forEach((cartItem) => {
      if (cartItem.itemPrice > 6000) {
        total += (cartItem.itemPrice - 6000) * cartItem.itemCount;
      } else {
        total += cartItem.itemPrice * cartItem.itemCount;
      }
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartStorage));
    localStorage.setItem("price", totalPrice);
    sendDataToParent(totalPrice);
  }, [trigger]);

  function minusMenu(menu) {
    if (menu.itemPrice > 6000) {
      totalPrice -= menu.itemPrice - 6000;
    } else {
      totalPrice -= menu.itemPrice;
    }

    setTotalPrice(totalPrice);
    cartStorage.some((cartItem) => {
      if (cartItem.itemId === menu.itemId) {
        cartItem.itemCount -= 1;
        if (cartItem.itemCount <= 0) {
          cartStorage = cartStorage.filter((ele) => {
            return ele !== cartItem;
          });
        }
      }
      return cartItem.itemId === menu.itemId;
    });
    setCartStorage(cartStorage);
    setTrigger(!trigger);
  }

  function plusMenu(menu) {
    if (menu.itemPrice > 6000) {
      totalPrice += menu.itemPrice - 6000;
    } else {
      totalPrice += menu.itemPrice;
    }

    setTotalPrice(totalPrice);
    cartStorage.some((cartItem) => {
      if (cartItem.itemId === menu.itemId) {
        cartItem.itemCount += 1;
      }
      return cartItem.itemId === menu.itemId;
    });
    setCartStorage(cartStorage);
    setTrigger(!trigger);
  }

  function deleteMenu(menu) {
    cartStorage = cartStorage.filter((ele) => {
      return ele !== menu;
    });
    setCartStorage(cartStorage);
    calculateTotal();
    setTrigger(!trigger);
  }

  const cartItemList = cartStorage.map((cartItem, index) => {
    let imgurl = `${process.env.REACT_APP_API_URL}/${cartItem.itemImgUrl}`;
    return (
      <Row className="paymentInfoItem justify-content-between" key={index}>
        <Col xs="2" className="paymentMenuInfo">
          <img src={imgurl} className="d-inline-block p-0" alt="menuImg"/>
        </Col>
        <Col xs="6" className="menuItemInfo">
        <div className="p-0 row">
          <h5 className="col-8 mb-0">{cartItem.itemName}</h5>
          <p className="col-4 text-center mb-0">{cartItem.itemPrice > 6000 ? cartItem.itemPrice - 6000 : cartItem.itemPrice}원</p>
          <p className="col-12 information mt-1 mb-0">현재 {cartItem.itemAvailable}그릇 후원되었습니다.</p>
        </div>
        </Col>
        <Col xs="4" className="paymentMenuButtons d-flex justify-content-center p-0">
          <Button
            className="paymentCountButton col-2"
            onClick={(e) => minusMenu(cartItem)}
          >
            -
          </Button>
          <Button className="paymentCount col-2 m-0 text-center">
            {cartItem.itemCount}
          </Button>
          <Button
            className="paymentCountButton col-2"
            onClick={(e) => plusMenu(cartItem)}
          >
            +
          </Button>
          <Button
            className="paymentDeleteButton col-2 offset-1"
            onClick={(e) => deleteMenu(cartItem)}
          >
            x
          </Button>
        </Col>
      </Row>
      
    );
  });

  return (
    <Col xs="12" md={{ size:6 , offset: 1 }} >
      <Card className="paymentInfoBox">
        <CardHeader>
          <h5 className="font-weight-bold mt-1">후원 바구니</h5>
        </CardHeader>
        <CardBody>  
          {cartItemList}
        </CardBody>
        </Card>
    </Col>
  );
}

export default PaymentInfo;
