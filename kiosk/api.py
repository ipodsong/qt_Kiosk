import requests
import json
import datetime

# backend server의 URL
serverUrl = "https://ooriggini.me:8080/app/"


def getStoreItem(storeID):
    # storeID를 통해 해당 store의 menu list를 받아옴
    res = requests.get(serverUrl + 'main/menulist/'+str(storeID))
    return res.json()


def getStoreInfo(storeID):
    # storeID를 통해 해당 store의 infomation을 받아옴
    res = requests.get(serverUrl + 'main/storedetail/' + str(storeID))
    return res.json()


def postKakaoPay(bag, totalAmount, totalCount, phoneNum):
    # 장바구니 리스트(bag)를 토대로 request를 만듬
    req = {}
    req['cid'] = 'TC0ONETIME'
    req['contributorPhone'] = phoneNum
    req['isKiosk'] = 1
    req['itemList'] = bag
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount
    req['userSeq'] = 0
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')

    # req를 보낸 후 결제 페이지의 url을 받음
    res = requests.post(serverUrl + 'payment/kakaopay',
                        headers=headers,
                        data=data)

    return res.text


def sendPgToken(pgToken):
    # date(형식 -> 20210217-163100)를 제작
    d = datetime.datetime.today()
    date = d.strftime('%Y%m%d-%H%M%S')

    # pgToken 전송
    url = serverUrl + "payment/kakaopaySuccess?pg_token={pgToken}"\
        .format(pgToken=pgToken)
    res = requests.get(url)

    return res.json()["paymentId"]


def sendCreditCard(an, bag, totalAmount, totalCount, phoneNum):
    # date(형식 -> 20210217-163100)를 제작
    d = datetime.datetime.today()
    date = d.strftime('%Y%m%d-%H%M%S')

    # 장바구니 리스트(bag)를 토대로 request를 만듬
    req = {}
    req['approvalNumber'] = an
    req['contributorPhone'] = phoneNum
    req['itemList'] = bag
    req['paidAt'] = date
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')

    # 일반 신용카드 결제 요청 전송
    res = requests.post(serverUrl + 'payment/creditcard',
                        headers=headers,
                        data=data)

    return res.text


def sendGdreamCard(an, bag, totalCount, totalAmount):
    # date(형식 -> 20210217-163100)를 제작
    d = datetime.datetime.today()
    date = d.strftime('%Y%m%d-%H%M%S')

    # 장바구니 리스트(bag)를 토대로 request를 만듬
    req = {}
    req['gdreamApproval'] = an
    req['itemList'] = bag
    req['paidAt'] = date
    req['totalCount'] = totalCount
    req['totalGDreamAmount'] = 6000
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')

    # 지드림 카드 결제 요청 전송
    res = requests.post(serverUrl + 'payment/gdream',
                        headers=headers,
                        data=data)

    return res.json()


def getCardType(cardId):
    # 카드 id를 통해 카드 종류를 받아옴
    req = serverUrl + "payment/cardtype?cardNumber={cardId}".format(cardId=cardId)
    res = requests.post(req)
    
    # res에 맞게 credit/gdream 리턴
    if res.text == "gdream":
        return res.text
    else:
        return "credit"

def getOrderList(storeId, payId):
    # order list를 받아와서 그에 맞는 주문번호를 return
    req = serverUrl + "store/orderlist?storeid={storeId}".format(storeId=storeId)
    res = requests.get(req)

    # default 주문번호 = 0
    orderNum = "0"

    print(payId)
    print(res.json())

    # res.json()에서 paymentId가 payId랑 동일한 element를 찾은 후, 그 element의 orderId를 반환
    for id in res.json():
        if id["paymentId"] == payId:
            orderNum = id["orderId"]

    return orderNum
