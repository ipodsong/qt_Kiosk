우리끼니
======================

# FrontEnd

## 0. Why React?

> 이부분은 조금 더 정리를 해봐야할듯

0. 그냥 리액트해보고 싶어서 하자고 한건데

1. React는 JSX = JavaScript XML, Vue는 Template
   1. `const example=<h1>This is Example</h1>`
   2. 같은 페이지이지만 사용자에 따라 조금은 다른 화면을 출력해야한다.
   3. Vue의 경우 여러개의 컴포넌트를(.vue 파일) 만들어서 바꿔가며 보여줘야하지만 React는 하나의 파일에서 JSX를 활용해서 컨트롤 가능하다
2. React의 기본 틀 자체가 CSS의 구조화를 지향한다.
   1. Vue는 한 파일에 html, css, js가 다 들어갈 수 있지만, react는 외부 파일을 import 한다
   2. 이는 코드 관리에 도움이 된다고 한다.
3. JS의 활용면에서 React가 우월하며 서버와 분리된 작업 가능
   1. 필요 기능 구축에 도움이 된다.
4. 타입스크립트는 React에서 훨씬 잘된단다. 우리는 안쓰긴 했지만 다음 플젝에선...
5. 외부 객체(카카오, 네이버, 아임포트)와 여러가지 상태변화를 조작 및 관리하기엔 React가 더 안정적


## 1. FrontEnd 기본 설정

[![npm](README.assets/npm-6.14.11-brightgreen)](https://www.npmjs.com/get-npm)[![node](README.assets/node-14.15.1-brightgreen)](https://nodejs.org/en/download/)

### 1.1 .env 설정

#### a102_fe/.env

```
REACT_APP_API_URL={서버 URL}
REACT_APP_NAVER_MAP_CLIENT_ID={네이버 지도 CLIENT ID}
REACT_APP_KAKAO_MAP_APP_KEY={네이버 지도 APP KEY}
REACT_APP_KAKAO_LOGIN_APP_KEY={카카오 로그인 APP KEY}
REACT_APP_IMPORT_INIT_KEY={아임포트 INIT KEY}
REACT_APP_STORE_TOKEN={테스트용 매장 JWT 값}
```

### 1.2 npm 설치

`npm install`

- 해당 명령어로 `react`, `reactstrap`을 포함한 필요 라이브러리 다운로드

### 1.3 FrontEnd 실행

#### 개발용 실행

`npm run start`, `npm start`

- React 개발용 실행. `localhost:3000`으로 사이트 확인 가능

#### 배포용 실행

`npm run build`, `npm build`

- React 배포용 실행
  - build 폴더가 만들어지며 해당 폴더를 서버에 넣어 배포



## 2. FrontEnd 폴더 구조

> 이 부분은 지워도 될듯... TMI인듯...

- node_modules : node 모듈 폴더로 `npm install`시 생성된다.
- public : React 기본 폴더로 `public/index.html`을 통해 SPA 렌더링

### src 폴더 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂naverAuth
 ┃ ┃ ┃ ┗ 네이버 로그인 관련 이미지 파일
 ┃ ┃ ┗ 페이지 내 필요 이미지 파일
 ┃ ┗ 📂scss
 ┃ ┃ ┣ 📂myscss
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┗ 회원 관련 컴포넌트 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┃ ┃ ┗ header, footer scss 파일
 ┃ ┃ ┃ ┃ ┗ 📂main
 ┃ ┃ ┃ ┃ ┃ ┗ 사용자 별 main 페이지 컴포넌트 scss 파일
 ┃ ┃ ┃ ┗ 📂pages
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┗ 회원 관련 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┃ ┗ main 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂payment
 ┃ ┃ ┃ ┃ ┃ ┗ 결제 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂qna
 ┃ ┃ ┃ ┃ ┃ ┗ QnA 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┃ ┃ ┗ 가게 상세 페이지 scss 파일
 ┃ ┃ ┃ ┃ ┗ 📂support
 ┃ ┃ ┃ ┃ ┃ ┗ 후원 페이지 scss 파일
 ┃ ┃ ┗ 📂theme
 ┃ ┃ ┃ ┗ 전체 적용 스타일 scss 파일
 ┣ 📂components
 ┃ ┣ 📂account
 ┃ ┃ ┗ 회원 관련 컴포넌트 js 파일
 ┃ ┣ 📂layout
 ┃ ┃ ┗ header, footer js 파일
 ┃ ┣ 📂main
 ┃ ┃ ┗ 사용자 별(아동, 후원자, 매장관리자) 컴포넌트 js 파일
 ┃ ┣ 📂payment
 ┃ ┃ ┗ 결제 관련 컴포넌트 js 파일
 ┃ ┣ 📂store
 ┃ ┃ ┗ 가게 상세 관련 컴포넌트 js 파일
 ┃ ┗ 📂support
 ┃ ┃ ┗ 후원 컴포넌트 js 파일
 ┣ 📂pages
 ┃ ┣ 📂account
 ┃ ┃ ┗ 회원 관련 페이지 js 파일
 ┃ ┣ 📂main
 ┃ ┃ ┗ 사용자 별(아동, 후원자, 매장관리자) 페이지 js 파일
 ┃ ┣ 📂payment
 ┃ ┃ ┗ 결제 페이지 js 파일
 ┃ ┣ 📂qna
 ┃ ┃ ┗ QnA 페이지 js 파일
 ┃ ┣ 📂store
 ┃ ┃ ┗ 가게 상세 페이지 js 파일
 ┃ ┗ 📂support
 ┃   ┗ 후원 페이지 js 파일
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.js
 ┣ 📜index.scss
 ┗ ...
```

## 3. 설정된 URL 주소

> App.js에서 확인 가능합니다.

### 3.1 아동 URL

| URL   | 관련 파일                      | 비고                                |
| ----- | ------------------------------ | ----------------------------------- |
| /main | /pages/main/childmain.js       | 아동용 메인 화면                    |
| /map  | /pages/support/childsupport.js | 후원된 매장 위치, 리스트, 현황 확인 |

### 3.2 후원자 URL

| URL                          | 관련 파일                                | 비고                               |
| ---------------------------- | ---------------------------------------- | ---------------------------------- |
| /                            | /pages/main/main.js                      | 후원자 메인 화면                   |
| /auth                        | /pages/account/authentication.js         | 로그인                             |
| /naver                       | /components/account/naverAuthCallback.js | 네이버 로그인                      |
| /signout                     | /pages/account/signout.js                | 로그아웃                           |
| /support                     | /pages/support/support.js                | 후원 가능 매장 지도 및 정보 리스트 |
| /storedetailsupport/:storeId | /pages/support/storeDetail.js            | 선택된 1개 매장 정보               |
| /qnacreate                   | /pages/qna/qnacreate.js                  | QnA 작성                           |
| /qna                         | /pages/qna/qnalist.js                    | 전체 QnA 리스트                    |
| /qnadetail                   | /pages/qna/qnadetail.js                  | 선택된 1개의 QnA 읽기              |
| /qnaupdate                   | /pages/qna/qnaupdate.js                  | 선택된 1개의 QnA 수정              |
| /payment                     | /pages/payment/payment.js                | 결제 페이지                        |
| /paymentCheck                | /pages/payment/kakaoPaymentCheck.js      | 카카오페이 결제 연결               |
| /paymentSuccess              | /pages/payment/paymentSuccess.js         | 결제 성공 페이지                   |
| /profile                     | /pages/account/profile.js                | 로그인 한 회원 프로필, 타임라인    |

### 3.3 매장 관리자 URL

> 관리자 로그인을 통해서만 접근 가능

| URL         | 관련 파일                  | 비고                                  |
| ----------- | -------------------------- | ------------------------------------- |
| /storeAdmin | /pages/store/storeadmin    | 매장 정보, 위치, 메뉴, 후원 현황 확인 |
| /menucreate | /pages/store/menucreate.js | 해당 매장 메뉴 추가                   |
| /menuupdate | /pages/store/menuupdate.js | 해당 매장 메뉴 수정                   |











# BackEnd

## 0. Why Spring Boot With JPA
### Spring Boot
- 포춘 500대 기업 중 90%는 백엔드 개발 언어로 자바를 채택
- 한국에서도 네이버, 카카오, 배달의민족 등 수많은 IT 기업에서 JAVA 개발자를 필요로 함

### JPA
- JPA는 자바 어플리케이션에서 RDBMS를 사용하는 방식을 정의한 인터페이스이다.
- 라이브러리가 아니므로 구현이 없다.
- CRUD 쿼리를 자동으로 생성해준다.
- Entity에 속성만 추가해준다면 쿼리를 건들 필요가 없다.
    
### MyBatis
- 중복되는 코드가 많고 실무에선 잘 쓰이지 않음
    
->반복을 줄이고 자바에 맞게 객체지향적인 설계를 하기 위해서는 JPA가 적합


## 1. API 상세 설명

### 1.1 account

<details>
<summary>로그인</summary>
<div markdown="1">

##### URL

POST /account/signinjwt <br>
Host: ooriggini.me:8080/app

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | ID                    |
| userPwd       | String        | 비밀번호              |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| token         | String        | jwtToken              |

</div>
</details>


<details>
<summary>카카오 로그인</summary>
<div markdown="1">

##### URL

POST /account/signinkakao <br>
Host: ooriggini.me:8080/app

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 카카오에서 받은 유저 번호 |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| token         | String        | jwtToken              |

</div>
</details>


<details>
<summary>네이버 로그인</summary>
<div markdown="1">

##### URL

POST /account/signinnaver <br>
Host: ooriggini.me:8080/app

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| Authorization | String        | 네이버에서 받은 Autorization |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| token         | String        | jwtToken              |

</div>
</details>


<details>
<summary>회원가입</summary>
<div markdown="1">

##### URL

POST /account/signup <br>
Host: ooriggini.me:8080/app

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | NULL                  |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |

</div>
</details>


<details>
<summary>회원정보 변경</summary>
<div markdown="1">

##### URL

POST /account/update <br>
Host: ooriggini.me:8080/app

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| result        | String        | 처리 결과             |


</div>
</details>


<details>
<summary>회원 후원 상세내역</summary>
<div markdown="1">

##### URL

POST /account/usercontribution <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
|         | ContributionResult        | 후원 상세             |

#### contribution

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| contributionId | int | 후원 아이디 |
| storeId | int | 가게 아이디 |
| storeName | String | 가게 이름 |
| itemId | int | 메뉴 아이디 |
| itenName | String | 메뉴 이름 |
| user | User | 유저 정보 |
| contributionMessage | String | 후원 메시지 |
| contributionAnswer | String | 아동 답변 |
| contributionDate | Date | 후원 날짜 |
| contributionDateUsed | Date | 후원 사용 날짜 |
| contributionUse | int | 후원사용 유무 |
| payment | Payment | 결제 정보 |

#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |

</div>
</details>


<details>
<summary>ID 중복확인</summary>
<div markdown="1">

##### URL

POST /account/userdupli <br>
Host: ooriggini.me:8080/app

#### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | User        | 존재하면 유저정보 아니면 NULL              |


#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |

</div>
</details>


<details>
<summary>회원 정보</summary>
<div markdown="1">

##### URL

POST /account/userInfo <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| |  User        | 유저정보              |


#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |

</div>
</details>


<details>
<summary>회원 후원내역</summary>
<div markdown="1">

##### URL

POST /account/userwithus <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userWithUs    | int           | 가입한 일수           |
| contributionCount | int | 총 후원 횟수 | 
| contributionTotal | int | 총 후원 금액 |


</div>
</details>


### 1.2 main

<details>
<summary>가게 목록</summary>
<div markdown="1">

##### URL

GET /main/mapview/storelist/{Juso} <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | AllStore | 가게정보를 리스트로 반환 |


##### AllStore

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| sotreLocation | String | 가게 주소 |
| storeCategory | String | 가게 분류 |
| storeItemAvailable | int | 가게에 이용가능한 음식 수 |
| storeKiosk | int | 후원가맹점이면 1 아니면 0 |


</div>
</details>


<details>
<summary>가게 메뉴정보</summary>
<div markdown="1">

##### URL

GET /main/menulist/{storeId} <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Menu | 해당 가게의 메뉴 정보를 리스트로 반환 |


##### Menu

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 메뉴 가격 |
| itemAvailable | int | 남은 음식 수 |
| itemContributionAmount | int | 최근 한달간 후원개수 |
| itemImgUrl | String | 메뉴 사진 url |


</div>
</details>


<details>
<summary>가게 상세정보</summary>
<div markdown="1">

##### URL

GET /main/storedetail/{storeId} <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | StoreDetail | 해당 가게의 메뉴 정보를 리스트로 반환 |


##### StoreDetail

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| storeName | String | 가게 이름 |
| storePhone | String | 가게 전화번호 |
| storeCategory | String | 가게 분류 |
| storeLocation | String | 가게 주소 |
| storeContributionAmount | int | 최근 한달간 후원수 |


</div>
</details>


<details>
<summary>유저그릇  랭킹</summary>
<div markdown="1">

##### URL

GET /main/userrankbowl <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | UserRank | 유저 랭킹  |


##### UserRank

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userName | String | 유저 이름 |
| userTotalContributionCount | int | 총 후원 그릇 수 |


</div>
</details>


<details>
<summary>유저 후원 총금액</summary>
<div markdown="1">

##### URL

GET /main/usertotal <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | int | 총 금액  |


</div>
</details>


### 1.3 payment

<details>
<summary>카드정보저장</summary>
<div markdown="1">

##### URL

POST /payment/cardcreate <br>
Host: ooriggini.me:8080/app <br>


##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| cardNumber    | String        | cardNumber            |
| cardType      | String        | gdream/credit         |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


<details>
<summary>카드정보반환</summary>
<div markdown="1">

##### URL

POST /payment/cardtype <br>
Host: ooriggini.me:8080/app <br>


##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| cardNumber    | String        | cardNumber            |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String        | gdream/credit         |


</div>
</details>


<details>
<summary>키오스크 일반 신용카드 결제 처리결과 저장</summary>
<div markdown="1">

##### URL

POST /payment/creditcard <br>
Host: ooriggini.me:8080/app <br>


##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| approvalNumber| String        | 승인번호            |
| contributorPhone | String | 후원자 핸드폰 번호|
| itemList | PaymentItem | 결제할 메뉴정보 리스트 |
| paidAt | String | 결제시간 | yyyyMMdd-HHmmss |
| totalAmount | int | 총 결제금액 |
| totalCount | int | 총 메뉴개수 |

#### PaymentItem

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 아이디 |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 결제 금액 |
| itemCount | int | 메뉴 개수 |
| msg | String | 후원 메시지 |
| support | int | 후원 유무 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String        | 처리 결과         |


</div>
</details>


<details>
<summary>지드림 카드 결제 처리결과 저장</summary>
<div markdown="1">

##### URL

POST /payment/gdream <br>
Host: ooriggini.me:8080/app <br>


##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| gdreamApproval| String        | 승인번호            |
| itemList | PaymentItem | 결제할 메뉴정보 리스트 |
| paidAt | String | 결제시간 | yyyyMMdd-HHmmss |
| totalGDreamAmount | int | 총 결제금액 |
| totalCount | int | 총 메뉴개수 |

#### PaymentItem

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 아이디 |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 결제 금액 |
| itemCount | int | 메뉴 개수 |
| msg | String | 후원 메시지 |
| support | int | 후원 유무 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| paymentId | String | 결제 ID |
| contributionMsg | String | 후원메시지 |


</div>
</details>


<details>
<summary>아임포트 결제 처리결과 저장</summary>
<div markdown="1">

##### URL

POST /payment/iamport <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}" (필수 x)

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| imp_uid       | String        | 승인번호            |
| contributorPhone | String | 후원자 핸드폰 번호|
| itemList | PaymentItem | 결제할 메뉴정보 리스트 |
| merchant_uid | String | 아임포트 등록 가게 id |
| paidAt | String | 결제시간 | yyyyMMdd-HHmmss |
| paid_amount | int | 총 결제금액 |
| totalCount | int | 총 메뉴개수 |

#### PaymentItem

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 아이디 |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 결제 금액 |
| itemCount | int | 메뉴 개수 |
| msg | String | 후원 메시지 |
| support | int | 후원 유무 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String        | 처리 결과         |


</div>
</details>


<details>
<summary>카카오페이 결제 요청</summary>
<div markdown="1">

##### URL

POST /payment/kakaopay <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}" (필수 x)

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| cid       | String        | 카카오페이 등록 가게 id |
| contributorPhone | String | 후원자 핸드폰 번호|
| itemList | PaymentItem | 결제할 메뉴정보 리스트 |
| paidAmount | int | 총 결제금액 |
| totalCount | int | 총 메뉴개수 |
| isKiosk | int | 키오스크면 1 아니면 0 |

#### PaymentItem

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 아이디 |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 결제 금액 |
| itemCount | int | 메뉴 개수 |
| msg | String | 후원 메시지 |
| support | int | 후원 유무 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | returnURL |

</div>
</details>


<details>
<summary>카카오페이 결제 처리</summary>
<div markdown="1">

##### URL

POST /payment/kakaopaySuccess/{pg_token} <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| kakaoPayApproval | String        | 처리 결과 (Kakao Developer 페이지 참고) |
| paymentId | String | 결제 Id |

</div>
</details>


### 1.4 QnA

<details>
<summary>게시판 목록 불러오기</summary>
<div markdown="1">

##### URL

GET /qna/{page} <br>
Host: ooriggini.me:8080/app <br>


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Page<Qna> | qna 페이지 반환 |

#### Qna

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna번호 |
| user | User | user정보 |
| qnaReply | QnaReply | 답변 정보 |
| qnaDate | Date | 문의날짜 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |

#### QnaReply

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| replySeq | int | reply 번호 |
| user | User | user정보 |
| replyDate | Date | 답변날짜 |
| replyTitle | String | 글 제목 |
| replyContent | String | 글 내용 |
| replySecret | int | 비밀글이면 1 아니면 0 |

#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


</div>
</details>


<details>
<summary>QnA 질문하기</summary>
<div markdown="1">

##### URL

POST /qna/create <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Qna | 글 제목, 글 내용, 비밀글 |

#### Qna

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna번호 |
| user | User | user정보 |
| qnaReply | QnaReply | 답변 정보 |
| qnaDate | Date | 문의날짜 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |


</div>
</details>


<details>
<summary>QnA 질문 삭제</summary>
<div markdown="1">

##### URL

POST /qna/delete/{qnaSeq} <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


<details>
<summary>마이페이지에서 QnA 게시판 불러오기</summary>
<div markdown="1">

##### URL

GET /qna/mypage <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Qna | qnaList 반환 |

#### Qna

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna번호 |
| user | User | user정보 |
| qnaReply | QnaReply | 답변 정보 |
| qnaDate | Date | 문의날짜 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |

#### QnaReply

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| replySeq | int | reply 번호 |
| user | User | user정보 |
| replyDate | Date | 답변날짜 |
| replyTitle | String | 글 제목 |
| replyContent | String | 글 내용 |
| replySecret | int | 비밀글이면 1 아니면 0 |

#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


</div>
</details>


<details>
<summary>QnA 질문 및 답변 상세 내용</summary>
<div markdown="1">

##### URL

POST /qna/read <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Qna | qnaSeq, qnaSecret |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Qna | 상세내용 반환 |

#### Qna

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna번호 |
| user | User | user정보 |
| qnaReply | QnaReply | 답변 정보 |
| qnaDate | Date | 문의날짜 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |

#### QnaReply

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| replySeq | int | reply 번호 |
| user | User | user정보 |
| replyDate | Date | 답변날짜 |
| replyTitle | String | 글 제목 |
| replyContent | String | 글 내용 |
| replySecret | int | 비밀글이면 1 아니면 0 |

#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


</div>
</details>


<details>
<summary>QnA 답변하기</summary>
<div markdown="1">

##### URL

POST /qna/reply/create <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna 번호 |
| | reply | 답변 제목, 답변 내용 |

#### Qna

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnaSeq | int | qna번호 |
| user | User | user정보 |
| qnaReply | QnaReply | 답변 정보 |
| qnaDate | Date | 문의날짜 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |


</div>
</details>


<details>
<summary>QnA 답변 상세 내용</summary>
<div markdown="1">

##### URL

POST /qna/reply/read <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| replySeq | int | 답변 번호 |
| qnsSeq | int | 글 번호 |
| replySecret | int | 비밀글이면 1 아니면 0 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Qna | 상세내용 반환 |

#### QnaReply

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| replySeq | int | reply 번호 |
| user | User | user정보 |
| replyDate | Date | 답변날짜 |
| replyTitle | String | 글 제목 |
| replyContent | String | 글 내용 |
| replySecret | int | 비밀글이면 1 아니면 0 |

#### User

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| userId        | String        | 아이디                |
| userPwd       | String        | 비밀번호              |
| userName      | String        | 이름                  |
| userEmail     | String        | 이메일                |
| userPhone     | String        | 핸드폰번호            |


</div>
</details>


<details>
<summary>QnA 질문 수정</summary>
<div markdown="1">

##### URL

POST /qna/update <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| qnsSeq | int | 글 번호 |
| qnaTitle | String | 글 제목 |
| qnaContent | String | 글 내용 |
| qnaSecret | int | 비밀글이면 1 아니면 0 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리 결과 |


</div>
</details>


### 1.5 store

<details>
<summary>가게 기본 정보</summary>
<div markdown="1">

##### URL

GET /store/basicinfo <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 id |
| storeName | String | 가게이름 |
| storeCategory | String | 가게 분류 |
| storeLocation | String | 가게 주소 |
| storeRegDate | Date | 가게 등록 날짜 |
| storePhone | String | 가게 전화번호 |
| storeItemAvailable | int | 현재 이용가능한 그릇 개수 |
| storeItemTOtal | int | 총 후원된 그릇 개수 |
| storeTotalContributionAmount | RegDate부터 지금까지의 후원금액 |
| storeSettlementDay | int | 정산 날짜 |


</div>
</details>


<details>
<summary>가게 메뉴 추가</summary>
<div markdown="1">

##### URL

POST /store/item/create <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 메뉴 가격 |
| | file | 메뉴 사진 |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


<details>
<summary>가게 메뉴 추가</summary>
<div markdown="1">

##### URL

GET /store/item/delete/{itemId} <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| itemId | int | 메뉴 id |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


<details>
<summary>가게 메뉴 수정</summary>
<div markdown="1">

##### URL

POST /store/item/update <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| itemId | int | 메뉴 id |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 메뉴 가격 |
| itemImgUrl | String | 이미지 url |
| | file | 메뉴 사진 |


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


<details>
<summary>가게 메뉴 리스트 가져오기</summary>
<div markdown="1">

##### URL

POST /store/itemlist <br>
Host: ooriggini.me:8080/app <br>
Header: "token : {token값}"


##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Item | 메뉴 리스트 |


##### Item
| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게id |
| itemId | int | 메뉴 id |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 메뉴 가격 |
| supportPrice | int | 후원 가격 |
| itemAvailable | int | 이용가능 개수 |
| itemTotal | int | 총 후원 개수 |
| itemImgUrl | String | 이미지 url |

</div>
</details>


<details>
<summary>주문완료되지 않은 orderlist 반환</summary>
<div markdown="1">

##### URL

GET /store/orderlist <br>
Host: ooriggini.me:8080/app <br>

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 번호 |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| paymentId | String | paymentId 반환 |


</div>
</details>


<details>
<summary>orderlist 업데이트</summary>
<div markdown="1">

##### URL

POST /store/orderlist <br>
Host: ooriggini.me:8080/app <br>

##### Request

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId | int | 가게 번호 |
| orderNum | String | paymentId |

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | String | 처리결과 |


</div>
</details>


### 1.6 support

<details>
<summary>가게 메뉴 정보</summary>
<div markdown="1">

##### URL

GET /support/menulist/{storeId} <br>
Host: ooriggini.me:8080/app <br>

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | Menu | 해당 가게의 메뉴 정보를 리스트로 반환 |


##### Menu

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| itemId | int | 메뉴 아이디 |
| itemName | String | 메뉴 이름 |
| itemPrice | int | 메뉴 가격 |
| itemAvailable | int | 남은 음식 수 |
| itemContributionAmount | int | 최근 한달간 후원개수 |
| itemImgUrl | String | 메뉴 사진 url |


</div>
</details>


<details>
<summary>가게 상세 정보</summary>
<div markdown="1">

##### URL

GET /support/storedetail/{storeId} <br>
Host: ooriggini.me:8080/app <br>

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | StoreDetail | 해당 가게의 상세 정보를 반환 |


##### StoreDetail

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| storeName | String | 가게 이름 |
| storePhone | String | 가게 전화번호 |
| storeCategory | String | 가게 분류 |
| storeLocation | String | 가게 주소 |
| storeContributionAmount | int | 최근 한달간 후원수 |


</div>
</details>


<details>
<summary>후원 가게 목록</summary>
<div markdown="1">

##### URL

GET /support/supportstorelist/{Juso} <br>
Host: ooriggini.me:8080/app <br>

##### Response

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| | SupportStore | 가게리스트를 반환 |


##### SupportStore

| Name          | Type          | Description           |
| ------------- | ------------- | --------------------- |
| storeId       | int           | 가게아이디            |
| sotreLocation | String | 가게 주소 |
| storeCategory | String | 가게 분류 |
| storeItemAvailable | int | 가게에 이용가능한 음식 수 |
| storeItemTotal | int | 가게에 총 후원된 음식 수 |


</div>
</details>



## 2. 실행 및 배포

### 2.1 application.properties 설정 


```
spring.application.name= SpringBootJdbc
spring.datasource.url=
spring.datasource.username=
spring.datasource.password= 
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=false
spring.jpa.database=mysql

spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jackson.serialization.fail-on-empty-beans=false
server.port=

resources.location=
resources.uri_path=
	
JWT.ISSUER=
JWT.SECRET=

Kakao.APP_ADMIN_KEY=
Kakao.WEB_RETURN_URL=
Kakao.KIOSK_RETURN_URL=

coolsms.API_KEY=
coolsms.API_SECRET=
coolsms.PHONE=

CRYPTO_KEY=
ALGORITHM=
```

### 2.2 배포
- `./gradlew build`로 war 파일 생성
- 서버 톰캣 `webapps` 폴더에 위에서 생성한 `app.war` 넣어서 배포

# Server

### 1. HTTPS 적용 위한 인증서 생성
- `certbot certonly --standalone -d {도메인명}` 명령어 통해 인증서 생성

### 2. tomcat server.xml 설정
```
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```
```
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" scheme="https" secure="true" SSLEnabled="true" defaultSSLHostConfigName={도메인명(여러개라면 첫번째걸로)} >
    	<UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol" />
        <SSLHostConfig hostName={도메인명1}>
            <Certificate certificateKeyFile="/etc/letsencrypt/live/{도메인명1}/privkey.pem"
                         certificateFile="/etc/letsencrypt/live/{도메인명1}/cert.pem"
                         certificateChainFile="/etc/letsencrypt/live/{도메인명1}/fullchain.pem"
                         type="RSA" />
    	</SSLHostConfig>
	    <SSLHostConfig hostName={도메인명2}>
            <Certificate certificateKeyFile="/etc/letsencrypt/live/{도메인명2}/privkey.pem"
                         certificateFile="/etc/letsencrypt/live/{도메인명2}/cert.pem"
                         certificateChainFile="/etc/letsencrypt/live/{도메인명2}/fullchain.pem"
                         type="RSA" />
        </SSLHostConfig>
    </Connector>
```

### 3. nginx conf파일 설정
```
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name {도메인명};
  root {경로}/build;
  location / {
    root   {경로}/build;
    index  index.html index.htm;
    try_files $uri /index.html;
  }
}

server {
        listen       443;
        listen       [::]:443;
        ssl on;
        server_name  {도메인명};
        root         {경로}/build;
        charset utf-8;

        ssl_certificate         /etc/letsencrypt/live/{도메인명}/fullchain.pem;
        ssl_certificate_key     /etc/letsencrypt/live/{도메인명}/privkey.pem; 

        location / {
        root   {경로}/build;
        index  index.html index.htm;
        try_files $uri /index.html;
       }
}

server {
  listen 80;
  listen [::]:80;
  server_name {도메인명2};
  location ~* ^(.*)$ {
          rewrite ^(.*)$ {도메인명}$1 permanent;
          break;
        }

}

```













# 키오스크 사용 방법

## 1. 키오스크 실행 설명

### 1.1. 실행 환경

	Windows 10 64bit
	Python 3.9

### 1.2. 사용 패키지

	실행 전 아래의 패키지들을 설치해주세요.

| 패키지 이름   |      버전 |
| :------------ | --------: |
| PyQt5         |    5.15.2 |
| PyQt5-sip     |    12.8.1 |
| PyQtWebEngine |    5.15.2 |
| certifi       | 2020.12.5 |
| chardet       |     4.0.0 |
| idna          |      2.10 |
| pyserial      |       3.5 |
| requests      |    2.25.1 |
| urllib3       |    1.26.3 |

	>> pip install PyQt5 PyQtWebEngine requests pyserial

### 1.3. NFC 모듈

#### 1.3.1 NFC 모듈 사용 시

> PN532 NFC 모듈 사용 기준
>
> * I2C 통신
>
>   ```
>   아두이노와 PN532 모듈의 I2C 통신을 위해 아래와 같이 연결합니다.(유동적으로 변경 가능)
>   ```
>
> >| 아두이노 PIN |   모듈 PIN |
> >| :----------- | ---------: |
> >| SDA          |        SDA |
> >| SCL          |        SCL |
> >| Pin 8        | RST(Reset) |
> >| Pin 9        |        IR0 |
> >| GND          |        GND |
> >| 5V           |         5V |
>
> * 바이너리 업로드
>
>   ```
>   아래의 링크에서 Arduino IDE를 다운로드 후 설치합니다.
>   설치 후 아두이노를 연결하고 [iso14443a_uid.ino]을 컴파일 후 업로드 합니다.
>   ```
>
> ><https://www.arduino.cc/>

#### 1.3.2 NFC 모듈 미사용 시

> arduinoSerial.py의 testmode 변수 설정을 통해 카드 태그를 테스트 할 수 있습니다.
>
> * testmode = testCreditCardId
>
>   ```
>   카드 태그 선택 시 일반 신용카드가 태그 된 상태로 진행됩니다.
>   ```
>
> * testmode = testGdreamCardId
>
>   ```
>   카드 태그 선택 시 후원된 음식을 먹기 위한 Gdream 카드가 태그 된 상태로 진행됩니다.
>   ```

#### 1.3.3 NFC 모듈 연결 실패

> 기본 USB Port number는 "COM3"으로 설정되어 있습니다.
> 만약 연결 시에도 에러가 발생한다면, 아래를 참고해주세요.
>
> * PORT 변경
>
>   ```
>   arduinoSerial.py의 PORT 변수 설정을 통해 사용하는 포트를 변경할 수 있습니다
>   아두이노가 연결 된 USB 포트 번호를 확인(아두이노 IDE를 통해 쉽게 확인 가능) 후 해당 포트의 이름을
>   arduinoSerial.py의 PORT 변수에 저장합니다.
>   Ex) PORT = "COM3"
>   ```

### 1.4. 키오스크 실행

> 키오스크를 실행하기 위해 아래와 같은 명령어를 실행합니다.
>
> ```
> python et.py
> ```
>
> 자동 최대화를 하고싶으면 et.py에서 class et의 __init__ 함수 내부에 self.showMaximized()을 추가합니다.
>
> <pre>
> <code>
> ```
> class et(QMainWindow, Ui_mainWindow):  
> def __init__(self):  
> super().__init__()  
> self.ui = Ui_mainWindow()  
> self.ui.setupUi(self)   
> self.showMaximized() <<< 추가해주세요.
> ```
> </code>
> </pre>

### 1.5. Gdream 카드 등록

> 지드림 카드 등록을 위해 아래와 같이 해주세요.
>
> ```
> arduinoSerial.py에 print(self.line)를 추가해주세요.
> ```
>
> <pre>
> <code>
> ```
> if self.exitFlag == 0:  
> # bytes -> str 형 변환  
> self.line = str(self.line)  
> # str 파싱  
> # "b'0x00000000H\\r\\n'" -> "0x00000000"  
> self.line = self.line.split("\'")[1].split("H")[0]  
> print(self.line) <<< 추가해주세요
> # rfid를 통해 받아 온 card id를 전송  
> self.notifyProgress.emit(self.line)
> ```
> </code>
> </pre>
>
>
> 추가 후 키오스크의 카드 결제 단계에서 등록을 원하는 카드를 태그하면
> 콘솔창에 카드 번호가 출력됩니다.
> Ex) 0xAF131025
>
> 이후 아래와 같은 요청을 보냅니다.
>
> ```
> https://ooriggini.me:8080/app/payment/cardcreate?cardNumber=0xAF131025&cardType=gdream
> ```

