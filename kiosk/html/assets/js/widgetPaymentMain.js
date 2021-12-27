//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickKakaoPay(){
    fadeout();
    setTimeout(function(){
        handler.nextPage("kakao")
    }, 1000)
}

function clickCardTagging(){
    fadeout();
    setTimeout(function(){
        handler.nextPage("rfid")
    }, 1000)
}

function fadein() {
    document.getElementById("fade").setAttribute("class", "payment-main fade-in");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "payment-main opaone");
    }, 1000)
}

function fadeout() {
    document.getElementById("fade").setAttribute("class", "payment-main fade-out");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "payment-main opazero");
    }, 1000)
}

let pCardBody = document.getElementsByClassName("purchase-card-body")[0];
let pResult = document.getElementsByClassName("purchase-result")[0];

function addItem(itemId, itemName, itemPrice, itemCnt){
    pItem = `<div class="purchase-item">
                <div class="purchase-item-title">${itemName}</div>
                <div id="${itemId}Cnt" class="purchase-item-quantity">${itemCnt}개</div>
                <div class="purchase-item-cost">${itemPrice}원</div>
            </div>`;

    if (!addCnt(itemId)) {
        pCardBody.insertAdjacentHTML("beforeend", pItem);
    }
}

function addCnt(itemId) {
    try {
        let itemCnt = document.getElementById(String(itemId) + "Cnt")
        itemCnt.innerText = String(parseInt(itemCnt.innerText) + 1)
        return true
    }
    catch (error) {
        return false;
    }
}

function addResult(totalCnt, totalPrice){
    rItem = `<div class="purchase-result-quantity">총 주문 수량 ${totalCnt}개</div>
             <div class="purchase-result-cost">총 주문 금액 ${totalPrice}원</div>`;
    
    pResult.insertAdjacentHTML("beforeend", rItem);
}

function clear(){
    pCardBody.innerHTML = "";
    pResult.innerHTML = "";
}