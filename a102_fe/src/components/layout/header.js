import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import oori from "../../assets/images/ooriname.png"
import { BiMapAlt } from "react-icons/bi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let childcheck = false;
  if (window.location.href.slice(-4) === "main" || window.location.href.slice(-3) === "map"){
    childcheck = true;
  }
  
  let storecheck= false;
  if (window.location.href.slice(-10) === "storeadmin" || window.location.href.slice(-10) === "menucreate"|| window.location.href.slice(-10) === "menuupdate"){
    storecheck = true;
  }

  const tempnav = (
    <div id="tempNav" className="mt-1">
      <a href="/main"><Button className="ml-1 mr-1 child">아동</Button></a>
      <a href="/"><Button className="ml-1 mr-1 supporter">후원자</Button></a>
      <a href="/storeadmin"><Button className="ml-1 mr-1 store">가게주인</Button></a>
    </div>
  )

  return (
    <Navbar light expand="md" className="mainHeader">
      
    { childcheck?

      <div className="d-flex flex-column col-10 offset-1">
      {tempnav}
      <NavbarBrand className="mainHeaderLogo">
        <a href="/main"><img src={oori} className="logoImage d-inline-block align-top" alt="logo"/></a>
      </NavbarBrand>
      <Nav className="row justify-content-center flex-row" navbar>
        <NavItem className="ml-1 mr-1">
          <NavLink href="/map"><b className="bigMapButton"><BiMapAlt/> 지도보기</b></NavLink>
        </NavItem>
      </Nav>
      </div>

    :

    ( storecheck?

      <div className="d-flex flex-column col-10 offset-1">
        {tempnav}
        <Nav className="ml-auto" navbar>
          <NavItem>
            {Boolean(localStorage.getItem("access-token")) === true && (localStorage.getItem("access-token") !== "undefined") ?
              <NavLink href="/signout">다음에 또 만나요 <b>로그아웃</b></NavLink>
              :
              <NavLink href="/auth">따뜻한 마음으로 우리와 <b>함께하기</b></NavLink>
            }
          </NavItem>
        </Nav>
        <NavbarBrand className="mainHeaderLogo">
          <a href="/storeadmin"><img src={oori} className="logoImage d-inline-block align-top" alt="logo"/></a>
        </NavbarBrand>
        <Nav className="row justify-content-center flex-row" navbar>
          {Boolean(localStorage.getItem("access-token")) ?
            <NavItem className="ml-1 mr-1">
              <NavLink href="/storeadmin"><b>우리 가게 현황</b></NavLink>
            </NavItem>
            : ""
          }
        </Nav>
      </div>
    
    :

      <div className="d-flex flex-column col-10 offset-1">
        {tempnav}
        <Nav className="ml-auto" navbar>
          <NavItem>
            {Boolean(localStorage.getItem("access-token")) === true && (localStorage.getItem("access-token") !== "undefined") ?
              <NavLink href="/signout">다음에 또 만나요 <b>로그아웃</b></NavLink>
              :
              <NavLink href="/auth">따뜻한 마음으로 우리와 <b>함께하기</b></NavLink>
            }
          </NavItem>
        </Nav>
        <NavbarBrand className="mainHeaderLogo">
        <a href="/"><img src={oori} className="logoImage d-inline-block align-top" alt="logo"/></a>
        </NavbarBrand>
        <Nav className="row justify-content-center flex-row" navbar>
          <NavItem className="ml-1 mr-1">
            <NavLink href="/support"> 후원하기 </NavLink>
          </NavItem>
          {Boolean(localStorage.getItem("access-token")) ?
            <NavItem className="ml-1 mr-1">
              <NavLink href="/profile">마이페이지</NavLink>
            </NavItem>
            : ""
          }
          <NavItem className="ml-1 mr-1">
            <NavLink href="/qna"> 문의하기 </NavLink>
          </NavItem>
        </Nav>
      </div>
    
    )
    }
    </Navbar>
  );
}

export default Header;