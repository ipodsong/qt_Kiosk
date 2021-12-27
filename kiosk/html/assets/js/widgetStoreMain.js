let itemCnt = 0;
let totalCnt = 0;
let itemCost = 0;
let mainState = 0;
let carouselCnt = 0;
let itemIdContainer = [];
let donationListCnt = 0;
let setModal = 0;
let maxContriNum = 15;
let phoneNumber = "010-";

let phoneNumberNode = document.getElementById("phoneNumber");
let modalContainer = document.getElementById("modal-container");
let modalContainer2 = document.getElementById("modal-container2");
let modalPrice = document.getElementById("modal-price");
let modalName = document.getElementById("modal-name");

let newCarouselContainer = `<div class="carousel-item">
                                <section class="bookmark-container">
                                </section>
                            </div>` ;

function addStoreItem(itemId, imgUrl, itemName, itemPrice, badge, intro, availableItem, contrubutionItem) {
    itemIdContainer.push(itemId);
    let numAvail = availableItem;
    let numContri = contrubutionItem;

    if(numAvail > maxContriNum){
        numAvail = maxContriNum;
        numContri = 0;
    }
    else{
        if(numContri > maxContriNum){
            numContri = maxContriNum - numAvail;
        }
        else{
            numContri -= numAvail;
        }
    }

    let serverImgUrl = "https://ooriggini.me:8080/app/" + imgUrl;
    let listElement = `<div id="main-${itemId}" class="bookmark" onclick="addBagItem(${itemId}, 0)">
                        <div class="bookmark-photo">
                            <div class="bookmark-image" style="background-image: url(${serverImgUrl});"></div>
                        </div>
                        <div class="bookmark-title">${itemName}</div>
                        <div class="bookmark-badge">${badge}</div>
                        <div class="bookmark-dividing"></div>
                        <div class="bookmark-detail">
                            ${intro}
                        </div>
                        <div class="bookmark-btn1"><span>${itemPrice}원</span></div>
                        <div class="bookmark-contribution">`
    for(let i=0;i<numContri;i++){
        listElement += `<i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>`
    }
    for(let i=0;i<numAvail;i++){
        listElement += `<i class="fab fa-gratipay p-1" style="font-size: 15px; color: rgba(255, 140, 0, 0.6)"></i>`
    }
    listElement +=  `</div>
                        <div class="bookmark-contribution-title"><span>이주의 후원 현황</span></div>
                    </div>`;

    if (itemCnt % 8 == 0 && itemCnt != 0) {
        carouselCnt = carouselCnt + 1;
        document.getElementsByClassName("carousel-inner")[0].insertAdjacentHTML("beforeend", newCarouselContainer)
        newCarouselIndicators = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${carouselCnt}"></li>`
        document.getElementsByClassName("carousel-indicators")[0].insertAdjacentHTML("beforeend", newCarouselIndicators)
    }
    document.getElementsByClassName("bookmark-container")[carouselCnt].insertAdjacentHTML("beforeend", listElement);
    itemCnt = itemCnt + 1;
}

function changeItemButton(){
    try {
        let bookmark = document.getElementsByClassName("bookmark");
        let bookmarkTitle = document.getElementsByClassName("bookmark-title");
        let bookmarkBtn = document.getElementsByClassName("bookmark-btn1");
        let len = bookmark.length;
        for(let i=0;i<len;i++){
            itemId = bookmark[i].id.split('-')[1];
            bookmark[i].setAttribute("onclick", `addBagItem(${itemId}, 1)`);
            price = Number(String(bookmarkBtn[i].innerText).split('원')[0])
            if(price >= 6000){
                bookmarkBtn[i].innerText = String(price - 6000) + "원";
            }
            bookmarkBtn[i].style = "background-color: #84BD00 !important;";

            bookmarkTitle[i].innerText = "(후원)" + bookmarkTitle[i].innerText;
            if(bookmarkTitle[i].innerText.length >= 12){
                bookmarkTitle[i].setAttribute("class", "bookmark-title bookmark-title-small");
            }
        }
        toggleDisplay();
    } catch (error) {
        alert(error);
    }
    
}

function clearStoreItem() {
    itemCnt = 0;
    carouselCnt = 0;
    itemIdContainer = [];
    setModal = 0;
    donationListCnt = 0;

    document.getElementsByClassName("carousel-inner")[0].innerHTML = `<div class="carousel-item active">
                                                                        <section class="bookmark-container">
                                                                        </section>
                                                                      </div>`;

    newCarouselIndicators = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${carouselCnt}"></li>`;
    document.getElementsByClassName("carousel-indicators")[0].innerHTML = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>`;

    document.getElementsByClassName("carousel-container")[0].style.display = 'flex';
    document.getElementsByClassName("donation-container")[0].style.display = 'none';
    mainState = 0;

    document.getElementsByClassName("donation-items")[0].innerHTML = "";
}

function addItem(itemId, itemName, itemPrice, isDonation) {
    officialId = itemId;
    if(isDonation){
        itemId = "donation-" + itemId;
        itemName = "(후원)" + itemName;
    }
    itemHtml = `<div class="cart-item" id="${itemId}">
                    <div class="cart-item-available">
                        <i class="fab fa-gratipay" style="font-size: 16px; color: rgba(255, 140, 0, 0.6)"></i>
                    </div>
                    <div class="cart-item-title">${itemName}</div>
                    <div class="cart-item-cost">${itemPrice}원</div>
                    <div class="cart-item-quantity">
                        <div class="cart-item-quantity-btn" id="${itemId}Minus" onclick="qtRemoveItem(${officialId}, ${isDonation})"> - </div>
                        <div id=${itemId}Cnt> 1 </div>
                        <div class="cart-item-quantity-btn" id="${itemId}Plus" onclick="qtAddItem(${officialId}, ${isDonation})"> + </div>
                    </div>
                </div>`

    if(setModal == 0){
        let intPrice;
        if(typeof(itemPrice) == "string") intPrice = parseInt(itemPrice); 
        if(intPrice >= 6000){
            setModal = 1;
            setModalContent(intPrice - 6000, itemName);
        }
    }
    
    if (!addCnt(itemId)) {
        try {
            document.getElementsByClassName("cart-body")[0].insertAdjacentHTML("beforeend", itemHtml);
        } catch (error) {
            alert(error);
        }
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

function removeCnt(itemId, isDonation) {
    id = "";
    if(isDonation)  id = "donation-" + String(itemId);
    else            id = String(itemId);
    let itemCnt = document.getElementById(id + "Cnt")
    if (itemCnt.innerText != "1") {
        itemCnt.innerText = String(parseInt(itemCnt.innerText) - 1)
    }
    else {
        let removeElement = document.getElementById(id)
        removeElement.parentNode.removeChild(removeElement)
    }
}

function clearBag() {
    cartBody = document.getElementsByClassName("cart-body")[0]
    while (cartBody.hasChildNodes()) { cartBody.removeChild(cartBody.firstChild); }

}

function addCost(cost) {
    totalCnt = totalCnt + 1;
    itemCost = itemCost + cost;
    updateCost();
}

function removeCost(cost) {
    totalCnt = totalCnt - 1;
    itemCost = itemCost - cost;
    updateCost();
}

function clearCost() {
    totalCnt = 0;
    itemCost = 0;
    updateCost();
}

function comma(num) {
    var len, point, str;

    num = num + "";
    point = num.length % 3;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }

    return str;
}

function updateCost() {
    document.getElementById("totalCnt").innerText = String(totalCnt);
    document.getElementById("totalCost").innerText = comma(itemCost);
}

function toggleDisplay() {
    carousel = document.getElementsByClassName("carousel-container")[0];
    donation = document.getElementsByClassName("donation-container")[0];
    if (carousel.style.display == 'flex') {
        carousel.style.display = 'none';
        donation.style.display = 'flex';
    }
    else {
        carousel.style.display = 'flex';
        donation.style.display = 'none';
    }
}

function fadein() {
    document.getElementById("fade").setAttribute("class", "six-four fade-in");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "six-four opaone");
    }, 1000)
}

function fadeout() {
    document.getElementById("fade").setAttribute("class", "six-four fade-out");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "six-four opazero");
    }, 1000)
}

// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        mainState=0;
    }
}



//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function addBagItem(itemId, isSupport) {
    handler.addBagItem(itemId, isSupport)
}

function clickPay() {
    if(totalCnt == 0){
        alert("메뉴를 선택해주세요.");
    }
    else{
        if (!mainState) {
            //modal.style.display = "block";
            clickModal()
            mainState=1;
        }
        else {
            //modal.style.display = "none";
            clickContainer()
            fadeout()
            setTimeout(function(){
                handler.nextPage("payment")
            }, 1000)
        }
    }
}

function clickDonation(){
    //modal.style.display = "none";
    modalContainer.setAttribute('class', 'out')
    document.getElementById("phoneInput").value = "";
    toggleDisplay()
}

function clickPhoneNum(){
    phoneNumber ="010-";
    changePhoneNum()
    let alertMessage = document.getElementById("phone-alert");
    alertMessage.setAttribute("class", "void");
    modalContainer2.setAttribute('class', 'two')
}

function clickEnter(){
    if(phoneNumber.length == 13){
        document.getElementById("phoneInput").value = phoneNumber;
        handler.setPhoneNum(phoneNumber.replace("-", "").replace("-", ""));
        modalContainer2.setAttribute('class', 'out');
    }
    else{
        //경고메세지
        let alertMessage = document.getElementById("phone-alert");
        alertMessage.setAttribute("class", "unvoid");
    }

}

function clickCancel(){
    modalContainer2.setAttribute('class', 'out')
}

function clickReset() {
    handler.clearBag(function (retVal) {
        console.error(JSON.stringify(retVal));
    })
}

function qtRemoveItem(itemId, isSupport) {
    handler.removeBagItem(itemId, isSupport)
}

function qtAddItem(itemId, isSupport) {
    handler.addBagItem(itemId, isSupport)
}

function clickModal(){
    modalContainer.setAttribute('class', 'one')
}

function clickContainer(){
    modalContainer.setAttribute('class', 'out')
}

function setModalContent(price, name){
    modalPrice.innerText = String(price) + "원"
    modalName.innerText = name
}

function addDonationItem(itemId, imgUrl, itemName, itemPrice, badge, intro, availableItem, contrubutionItem) {
    donationListCnt += 1;
    
    let numAvail = availableItem;
    let numContri = contrubutionItem;

    if(numAvail > maxContriNum){
        numAvail = maxContriNum;
        numContri = 0;
    }
    else{
        if(numContri > maxContriNum){
            numContri = maxContriNum - numAvail;
        }
        else{
            numContri -= numAvail;
        }
    }
    if(typeof(itemPrice) == "string") intPrice = parseInt(itemPrice);
    itemPrice -= 6000;
    let serverImgUrl = "https://ooriggini.me:8080/app/" + imgUrl;
    let listElement = `<div class="donation-bookmark" onclick="addBagItem(${itemId}, 1)">
                        <div class="bookmark-photo">
                            <div class="bookmark-image" style="background-image: url(${serverImgUrl});"></div>
                        </div>
                        <div class="bookmark-title"> <span>${itemName}</span></div>
                        <div class="bookmark-badge">${badge}</div>
                        <div class="bookmark-dividing"></div>
                        <div class="bookmark-detail">
                            ${intro}
                        </div>
                        <div class="bookmark-btn1"><span>${itemPrice}원</span></div>
                        <div class="bookmark-contribution">`
    for(let i=0;i<numContri;i++){
        listElement += `<i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>`
    }
    for(let i=0;i<numAvail;i++){
        listElement += `<i class="fab fa-gratipay p-1" style="font-size: 15px; color: rgba(255, 140, 0, 0.6)"></i>`
    }
    listElement +=  `</div>
                        <div class="bookmark-contribution-title"><span>이주의 후원 현황</span></div>
                    </div>`;

    let addPosition = document.getElementsByClassName("donation-items")[0];
    addPosition.insertAdjacentHTML("beforeend", listElement);

    if(donationListCnt == 3){
        addPosition.removeChild(addPosition.firstChild);
    }
}

function changePhoneNum(){
    phoneNumberNode.innerText = phoneNumber;
}

function clickPad(opt){
    if(phoneNumber.length <= 13){
        if(opt >= 0 && opt <= 9 && phoneNumber.length != 13){
            phoneNumber += String(opt)
            if(phoneNumber.length == 8){
                phoneNumber += String("-")
            }
        }
        else if(opt == -1){
            //하나만 지우기
            if(phoneNumber.length > 4){
                phoneNumber = phoneNumber.slice(0, -1);
                if(phoneNumber.length == 8){
                    phoneNumber = phoneNumber.slice(0, -1);
                }
            }
        }
        else if(opt == -2){
            //모두 지우기
            phoneNumber = "010-";
        }
    }


    changePhoneNum();
}