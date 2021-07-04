import { Row, Col } from "reactstrap";


function Footer() {

  let childcheck = false;
  if (window.location.href.slice(-9) === "childmain" || window.location.href.slice(-8) === "childmap"){
    childcheck = true;
  }
  
  let storecheck= false;
  if (window.location.href.slice(-10) === "storeadmin" || window.location.href.slice(-10) === "menucreate"|| window.location.href.slice(-10) === "menuupdate"){
    storecheck = true;
  }

  return (
    <Row className="mainFooter p-2 pl-4" id={childcheck? "childColor": ( storecheck? "storeColor" : "" )}>
      <Col md="8" className="footer-copyright">
        <p className="mb-0">
          Copyright © SSAFY A102. 후원문의·상담 82-0190-6527-5118
        </p>
      </Col>
      <Col md="4">
        <p className="text-right mb-0">
          <i className="fa fa-heart">
            <a id={storecheck?"storeIFooter":""} href="https://musicshareroom.tk/"> 후원사 바로가기 </a>
          </i>
        </p>
      </Col>
    </Row>
  );
}

export default Footer;
