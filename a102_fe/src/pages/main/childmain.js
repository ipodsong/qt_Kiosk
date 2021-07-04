import React, { Fragment } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Whattoeat from "../../components/main/whattoeat.js";
import oori from "../../assets/images/oori.png";

function ChildMain() {
  return (
    <Fragment>
      <Row className="whattoeat">
        <Col
          sm="6"
          md={{ size: 5, offset: 1 }}
          className="childLeftContent childContent"
        >
          <Card>
            <CardBody sm="12" className="childimg">
              <a href="/map">
                <img src={oori} alt="childimg" />
              </a>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" md={{ size: 5 }} className="childRightContent childContent">
          <Whattoeat />
        </Col>
      </Row>
    </Fragment>
  );
}

export default ChildMain;
