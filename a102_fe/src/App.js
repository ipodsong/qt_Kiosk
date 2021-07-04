import React from "react";
import { Container, Row } from "reactstrap";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import ChildMain from "./pages/main/childmain";
import ChildSupport from "./pages/support/childsupport";
import Main from "./pages/main/main";
import Support from "./pages/support/support";
import Authentication from "./pages/account/authentication";
import Signout from "./pages/account/signout";
import Profile from "./pages/account/profile";
import StoreDetail from "./pages/support/storeDetail";
import QnaCreate from "./pages/qna/qnacreate";
import QnaList from "./pages/qna/qnalist";
import QnaDetail from "./pages/qna/qnadetail";
import QnaUpdate from "./pages/qna/qnaupdate";
import Payment from "./pages/payment/payment";
import KakaoPaymentCheck from "./pages/payment/kakaoPaymentCheck";
import PaymentSuccess from "./pages/payment/paymentSuccess";
import StoreAdmin from "./pages/store/storeadmin";
import MenuCreate from "./pages/store/menucreate";
import MenuUpdate from "./pages/store/menuupdate";
import "./App.css";

import NaverAuthCallback from "./components/account/naverAuthCallback";

function App() {
  return (
    <BrowserRouter>
      <Container fluid={true} className="mainContainer p-0">
        <Header />
        <Row className="mainBody">
          <Switch>
            {/* 아동 View */}
            <Route path="/main" component={ChildMain} />
            <Route path="/map" component={ChildSupport} />
            {/* 후원자 View */}
            <Route exact path="/" component={Main} />
            <Route path="/auth" component={Authentication} />
            <Route path="/naver" component={NaverAuthCallback} />
            <Route path="/signout" component={Signout} />
            <Route path="/support" component={Support} />
            <Route
              path="/storedetailsupport/:storeId"
              component={StoreDetail}
            />
            <Route path="/qnacreate" component={QnaCreate} />
            <Route path="/qna" component={QnaList} />
            <Route path="/qnadetail" component={QnaDetail} />
            <Route path="/qnaupdate" component={QnaUpdate} />
            <Route path="/payment" component={Payment} />
            <Route path="/paymentCheck" component={KakaoPaymentCheck} />
            <Route path="/paymentSuccess" component={PaymentSuccess} />
            <Route path="/storeAdmin" component={StoreAdmin} />
            {/* 가게주인 View */}
            <Route path="/menucreate" component={MenuCreate} />
            <Route path="/menuupdate" component={MenuUpdate} />
            {/* Profile 페이지의 경우 리다이렉트 보내주기 */}
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
          </Switch>
        </Row>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

// https://reactrouter.com/web/example/auth-workflow
// 여기는 Switch를 통해 페이지 로딩을 해 줄 분기점입니다! 위에 PrivateRoute를 사용했으니 설정도 해봅시다
function PrivateRoute({ children, ...rest }) {
  // let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // localStorage.getItem("access-token") !== 'undefined' ? (
        Boolean(localStorage.getItem("access-token")) &&
        localStorage.getItem("access-token") !== "undefined" ? (
          // auth.user ? (
          // 다만 PrivateRoute가 받는 children이 뭔지 모르겠네...
          children
        ) : (
          <Redirect
            to={{
              // /authtest로 접속할 경우 아래 path로 리다이렉트 해줍니다
              // 왜 pathname이지? path로 보내면 안되나? Redirect 가 가진게 이런 형식인가?
              pathname: "/auth",
              // 리다이렉트 하기 전 정보를 저장해두기도 합니다!
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
