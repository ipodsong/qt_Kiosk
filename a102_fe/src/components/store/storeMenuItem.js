import { Row, Button } from "reactstrap";

function StoreMenuItem(storeMenu) {
  function Update(menuitem) {
    window.history.pushState(menuitem, "menuitem", "/menuupdate");
    window.location.href = "/menuupdate";
  }

  function Delete(menuitem) {
    // console.log(menuitem);
    if (
      window.confirm(
        "정말로 상품을 삭제하시겠습니까? \n삭제된 상품을 복구 할 수 없습니다."
      )
    ) {
      fetch(
        `${process.env.REACT_APP_API_URL}/store/item/delete/${menuitem.itemId}`,
        {
          method: "GET",
          headers: {
            // token: localStorage.getItem("access-token"),
            token:
            `${process.env.REACT_APP_STORE_TOKEN}`,
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          storeMenu.sendTriggerToParent();
          // alert("삭제 성공");
          //   window.location.href = "/storeadmin";
        } else {
          alert(menuitem.itemId, "실패하셨습니다. 다시 시도해주세요.");
        }
      });
    }
  }

  //   console.log(storeMenu.storeMenu);
  let imgurl = `${process.env.REACT_APP_API_URL}/${storeMenu.storeMenu.itemImgUrl}`;
  return (
    <Row className="col-12 storeMenuItem justify-content-between p-0 mr-0 ml-0">
      <img
        src={imgurl}
        className="d-inline-block col-3"
        alt="
      menuImg"
      />
      <div className="col-7 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
        <h5 className="col-8">{storeMenu.storeMenu.itemName}</h5>
        <p className="col-4 text-right">{storeMenu.storeMenu.itemPrice}원</p>
        <p className="col information">
          현재 {storeMenu.storeMenu.itemAvailable}그릇 후원되었습니다.
        </p>
      </div>
      <div className="col-2 menuButtons">
        <Button
          className="menuButton mb-1"
          onClick={() => Update(storeMenu.storeMenu)}
        >
          수정
        </Button>
        <Button
          className="menuButton"
          onClick={() => Delete(storeMenu.storeMenu)}
        >
          삭제
        </Button>
      </div>
    </Row>
  );
}
export default StoreMenuItem;
