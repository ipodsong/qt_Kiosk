import React, { Fragment } from "react";import Billboard from "../../components/main/billboard.js";
import Aboutus from "../../components/main/aboutus.js";
import { 
  Container,
  Row,
  Col,} from "reactstrap";

function Main() {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="main">
          <Col md="6" lg={{ size: 5, offset: 1 }}>
            <Billboard />
          </Col>
          <Col md="6" lg={{ size: 5 }} className="aboutus">
            <Aboutus />
          </Col>
        </Row>
      </Container>
  </Fragment>  
  );
}

export default Main;
