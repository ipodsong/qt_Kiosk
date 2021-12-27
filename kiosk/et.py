from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from ui.main_ui2 import Ui_mainWindow
from api import *
from utils import *
from WebEnginePage import *
from kakaoSocket import *
from arduinoSerial import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import *

import sys
import datetime
import random

# Global variables
pageConnector = {}


# js로 부터의 function call을 handling 하는 class
class CallHandler(QObject):
    @pyqtSlot(QVariant)
    def nextPage(self, opt):
        print("Move to : ", opt)
        # opt에 해당하는 페이지로 이동시키는 함수에 연결
        # 사용가능목록(opt)
        # start, store, payment, kakao, rfid, complete
        pageConnector[opt]()

    @pyqtSlot(QVariant, QVariant)
    def addBagItem(self, itemNum, isSupport):
        # item number를 받아 장바구니에 추가해주는 함수에 연결
        w.addBagItem(itemNum, isSupport)

    @pyqtSlot(QVariant, QVariant)
    def removeBagItem(self, itemNum, isSupport):
        # item number를 받아 장바구니에서 제거해주는 함수(1개)에 연결
        w.removeBagItem(itemNum, isSupport)

    @pyqtSlot()
    def clearBag(self):
        # 장바구니를 비워주는 함수에 연결
        w.clearBagItem()

    @pyqtSlot(QVariant)
    def setPhoneNum(self, num):
        # 휴대폰 번호를 받아와 저장
        w.phoneNum = num


# QT 제어하는 메인 class
class et(QMainWindow, Ui_mainWindow):
    # main window init
    def __init__(self):
        super().__init__()
        self.ui = Ui_mainWindow()
        self.ui.setupUi(self) # main_ui 파일 불러옴
        # 메인 변수
        self.storeid = 1
        self.widgetList = {}
        self.itemCnt = 0
        self.totalCost = 0
        self.itemList = {}
        self.bag = []
        self.phoneNum = "010-0000-0000"
        self.donationCnt = 0
        self.recentDonationList = -1
        self.orderNum = ""
        self.thRfidFlag = 0
        self.thKakaoPayFlag = 0
        self.msg = "방문해주셔서<br>감사합니다,<br>맛있게 드세요!"

        # 페이지 리스트 생성 및 로드
        self.makePage()
        # loadFinidhed 설정 -> html/js가 로딩 되기 전에 js function call을 방지
        self.widgetList["widgetStoreMain.html"].page().loadFinished.connect(self.makeStoreItem)
        # kiosk 상단 icon, title, time 설정
        self.setTopBar()
        # 시작페이지 로딩
        self.loadStartPage()

    # 메인 변수 초기화
    def initVals(self):
        self.itemCnt = 0
        self.totalCost = 0
        self.bag.clear()
        self.phoneNum = ""
        self.msg = "방문해주셔서<br>감사합니다,<br>맛있게 드세요!"

    # Click 불가능한 label 등의 위젯을 클릭 가능하게 만들어주는 함수
    # 사용법 -> self.clickable(위젯이름).connect(실행할 함수)
    # ex) self.clickable(self.ui.labelHome).connect(self.loadStartPage)
    def clickable(self, widget):
        class Filter(QObject):
            clicked = pyqtSignal()
            def eventFilter(self, obj, event):
                if obj == widget:
                    if event.type() == QEvent.MouseButtonRelease:
                        if obj.rect().contains(event.pos()):
                            self.clicked.emit()
                            return True
                return False
        filter = Filter(widget)
        widget.installEventFilter(filter)
        return filter.clicked

    # 상단 바 설정
    def setTopBar(self):
        # 홈 버튼 아이콘 설정
        self.ui.labelHome.setPixmap(QPixmap("./ui/res/home.png").scaledToWidth(60))
        self.clickable(self.ui.labelHome).connect(self.loadStartPage)

        # 타이머 설정
        self.displayTimeTimer = self.makeTimer(1000, self.displayTime)
        self.displayTimeTimer.start()

        # 키오스크 타이틀 설정
        self.setKioskTitle(self.storeid)

    # 타이틀 설정
    def setKioskTitle(self, id):
        res = getStoreInfo(id)
        self.ui.labelTitle.setText(res["storeName"])

    # 시간 표시 타이머 함수
    def makeTimer(self, interval, connect):
        timer = QTimer(self)
        timer.setInterval(interval)
        timer.timeout.connect(connect)

        return timer

    # 우측 상단 날짜-시간을 세팅해주는 함수
    def displayTime(self):
        d = datetime.datetime.today()
        date = d.strftime('%Y-%m-%d')
        time = d.strftime('%p %I:%M:%S')
        self.ui.labelDate.setText(date)
        self.ui.labelTime.setText(time)

    # Page controller
    def makePage(self):
        htmlPath = getHtmlPathList("html")  # html file path를 받아옴

        # file path에 맞는 widget을 생성하여 widgetList에 추가
        for path in htmlPath:
            widget = QWebEngineView()
            widget.setPage(QWebEnginePage(widget))
            widget.setUrl(QUrl.fromLocalFile(path))

            # js->qt function call handle을 위해 연결
            widget.channel = QWebChannel()
            widget.handler = CallHandler()
            widget.channel.registerObject('handler', widget.handler)
            widget.page().setWebChannel(widget.channel)

            # main layout에 연결
            self.ui.mainLayout.addWidget(widget, 2, 0, 1, 3)

            # widget들의 list를 html 파일 이름으로 저장
            self.widgetList[path.split('/')[2]] = widget

    def loadStartPage(self):
        # Load start page
        # 장바구니 비움 및 변수 초기화 함수 실행
        self.clearBagItem()
        # 실행되고있는 thread 종료
        if self.thRfidFlag == 1:
            self.thRfid.stop()
        if self.thKakaoPayFlag == 1:
            print("exit kakao pay thread")
            self.thKakaoPay.stop()

        # complete 화면에서 count가 진행되고 있다면 종료
        self.widgetList['widgetComplete.html'].page().runJavaScript("stopCnt()")
        self.widgetList["widgetStart.html"].raise_()

    def loadItemListPage(self):
        # Load store main page
        # menu list에 아이템 설정
        self.makeStoreItem(True)
        self.widgetList["widgetStoreMain.html"].page().runJavaScript("fadein()")
        self.widgetList["widgetStoreMain.html"].raise_()

    def loadPaymentMethodPage(self):
        # Load payment selection page
        self.setPaymentBag()
        self.widgetList["widgetPaymentMain.html"].page().runJavaScript("fadein()")
        self.widgetList["widgetPaymentMain.html"].raise_()

    def loadKakaoPayPage(self):
        # Load kakao pay page
        # 장바구니 바탕으로 결제 요청 page url 받아옴
        url = postKakaoPay(self.bag, self.totalCost, self.itemCnt, self.phoneNum)
        # iframe의 url을 설정
        jscmd = "setUrl(\"{url}\")".format(url=url)
        self.widgetList["widgetKakaoPay.html"].page().runJavaScript(jscmd)
        self.widgetList["widgetKakaoPay.html"].raise_()

        # pg Token을 socket을 통해 받기 위한 thread 실행
        self.thKakaoPay = getPg(self)
        # thread의 signal에 함수 연결
        self.thKakaoPay.notifyProgress.connect(self.getPgToken)
        self.thKakaoPay.start()
        self.thKakaoPayFlag = 1

    def loadRfidPage(self):
        # Load rfid page
        # rfid 센서로부터 card id를 받기 위한 thread 실행

        self.thRfid = getSerial(self)
        # thread의 signal에 함수 연결
        self.thRfid.notifyProgress.connect(self.rfidPaymentVerification)
        self.thRfid.start()
        self.thRfidFlag = 1
        self.widgetList["widgetRfid.html"].raise_()

    def loadCompletePage(self):
        # Load complete page
        # Thread 종료 flag 설정
        self.thRfidFlag = 0
        self.thKakaoPayFlag = 0

        # complete 페이지의 number count 실행
        jscmd = "completeTimeout(10)"
        self.widgetList["widgetComplete.html"].page().runJavaScript(jscmd)

        # 주문번호를 표시하기 위해 getOrderList를 통해 해당하는 order number를 받아옴
        # complete page의 주문번호 변경
        orderNum = getOrderList(self.storeid, self.orderNum)
        jscmd = "setOrderNum({orderNum})".format(orderNum=orderNum)
        self.widgetList["widgetComplete.html"].page().runJavaScript(jscmd)

        # 후원메세지 받아와서 js에 전달
        jscmd = "setMsg(\'{msg}\')".format(msg=self.msg)
        self.widgetList["widgetComplete.html"].page().runJavaScript(jscmd)

        self.widgetList["widgetComplete.html"].raise_()


    # html control functions
    def makeStoreItem(self, ok):
        if ok:
            widget = self.widgetList["widgetStoreMain.html"]

            # 설정 된 아이템 초기화
            jscmd = "clearStoreItem()"
            widget.page().runJavaScript(jscmd)
            self.donationCnt = 0
            self.recentDonationList = -1

            # menu list를 받아옴
            self.itemList = getStoreItem(self.storeid)

            idIter = 0
            # itemList 내의 menu들을 하나씩 세팅해주는 js function call 내용 작성 및 실행
            for i in self.itemList:
                jscmd = "addStoreItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\'," \
                        " \'{itemPrice}\', \'{badge}\', \'{intro}\'" \
                        ", {available}, {contribution})"\
                    .format(itemId=idIter, imgUrl=i["itemImgUrl"], itemName=i["itemName"],
                            itemPrice=i["itemPrice"], badge="Hot!", intro="",
                            available=i["itemAvailable"], contribution=i["itemContributionAmount"])
                widget.page().runJavaScript(jscmd)
                idIter = idIter+1

            # 6000원 이상의 메뉴에 한해서, 랜덤으로 후원 추천 목록에 추가
            while True:
                addNum = random.randrange(0, len(self.itemList))
                if self.itemList[addNum]["itemPrice"] >= 6000:
                    self.addDonationList(addNum)
                    break

    def addBagItem(self, itemNum, isSupport):
        # store main의 장바구니에 아이템 추가하는 함수
        try:
            # item number와 support 여부에 맞는 item을 만듬
            item = self.makeItem(itemNum, isSupport)

            # 장바구니에 추가
            self.bag.append(item)

            # 전체주문가격과 수량을 추가
            self.totalCost = self.totalCost + item["itemPrice"]
            self.itemCnt = self.itemCnt + 1

            # store main의 장바구니 section에 item 표시
            jscmd = "addItem(\'{itemId}\', \'{itemName}\', \'{itemPrice}\', {isSupport})" \
                .format(itemId=itemNum, itemName=item["itemName"], itemPrice=item["itemPrice"], isSupport=isSupport)
            self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

            # store main의 장바구니 section에 수량 및 가격 추가
            jscmd = "addCost({cost})".format(cost=item["itemPrice"])
            self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

            # 후원 추천 리스트가 가득 차지 않았다면(max=2) 장바구니에 추가와 동시에 추천 리스트에 추가
            if item["itemPrice"] >= 6000 and self.donationCnt < 2 and \
                    self.recentDonationList != itemNum and isSupport == 0:
                self.addDonationList(itemNum)
                self.donationCnt = self.donationCnt + 1
                self.recentDonationList = itemNum

        except Exception as e:
            print(e)

    def removeBagItem(self, itemNum, isSupport):
        # item number와 support 여부에 맞는 item을 만듬
        item = self.makeItem(itemNum, isSupport)

        # 장바구이네서 제거
        self.bag.remove(item)

        # 전체주문가격과 수량을 제거
        self.totalCost = self.totalCost - item["itemPrice"]
        self.itemCnt = self.itemCnt - 1

        # store main의 장바구니 section에 item 제거
        jscmd = "removeCnt(\'{itemId}\', {isSupport})".format(itemId=itemNum, isSupport=isSupport)
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

        # store main의 장바구니 section에 수량 및 가격 제거
        jscmd = "removeCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def clearBagItem(self):
        # 장바구니 비우는 함수
        # 메인 변수 초기화
        self.initVals()

        # 장바구니 아이템 초기화 js function call
        jscmd = "clearBag()"
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

        # 장바구니 총액 및 총량 초기화 js function call
        jscmd = "clearCost()"
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def makeItem(self, itemNum, isSupport):
        # 옵션에 맞는 아이템을 만들어 반환
        refItem = self.itemList[itemNum]
        item = {"itemName": refItem["itemName"],
                "itemPrice": refItem["itemPrice"],
                "msg": "맛있게 드세요!",
                "itemCount": 1,
                "itemId": refItem["itemId"],
                "storeId": refItem["storeId"],
                "support": isSupport}
        if isSupport:
            item["itemPrice"] -= 6000
        return item

    def addDonationList(self, itemNum):
        # donation div에 후원 추천 목록 아이템 추가
        item = self.itemList[itemNum]
        jscmd = "addDonationItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\'," \
                " \'{itemPrice}\', \'{badge}\', \'{intro}\'" \
                ", {available}, {contribution})" \
            .format(itemId=itemNum, imgUrl=item["itemImgUrl"], itemName=item["itemName"],
                    itemPrice=item["itemPrice"], badge="Hot!", intro="",
                    available=item["itemAvailable"], contribution=item["itemContributionAmount"])
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def makePageConnector(self):
        # page name(str)과 load function 연결
        pc = {"start": self.loadStartPage, "store": self.loadItemListPage,
              "payment": self.loadPaymentMethodPage, "kakao": self.loadKakaoPayPage,
              "rfid": self.loadRfidPage, "complete": self.loadCompletePage}
        return pc

    def getPgToken(self, pgToken):
        # pg token 서버에 전송
        self.orderNum = sendPgToken(pgToken)
        self.loadCompletePage()

    def rfidPaymentVerification(self, data):
        # 결제대기 페이지 이동
        jscmd = "togglePage(done)"
        self.widgetList["widgetRfid.html"].page().runJavaScript(jscmd)

        # data에 맞게 opt 변경
        opt = getCardType(data)
        if opt == "credit":
            self.orderNum = sendCreditCard(data, self.bag, self.totalCost, self.itemCnt, self.phoneNum)
            self.loadCompletePage()

        if opt == "gdream":
            res = sendGdreamCard(data, self.bag, self.itemCnt, self.totalCost)
            self.orderNum = res["paymentId"]
            self.msg = res["contributionMsg"]
            self.loadCompletePage()

        # 페이지 초기화
        jscmd = "initPage()"
        self.widgetList["widgetRfid.html"].page().runJavaScript(jscmd)

    def setPaymentBag(self):
        # payment page의 주문 목록 생성 함수
        try:
            # 주문 목록 초기화
            jscmd = "clear()"
            self.widgetList["widgetPaymentMain.html"].page().runJavaScript(jscmd)

            # bag의 아이템 하나씩 추가
            for b in self.bag:
                # support 조건에 따라 내용 변경 후 아이템 추가
                id = b["itemId"]
                name = b["itemName"]
                if b["support"] == 1:
                    id = "donation-" + str(id)
                    name = "(후원)" + name
                jscmd = "addItem(\"{itemId}\", \"{itemName}\", \"{itemPrice}\", \"{itemCnt}\",)"\
                    .format(itemId=id, itemName=name,
                            itemPrice=b["itemPrice"], itemCnt=b["itemCount"])
                self.widgetList["widgetPaymentMain.html"].page().runJavaScript(jscmd)

            # 주문 총액 및 총량 추가
            jscmd = "addResult({totalCnt}, {totalPrice})".format(totalCnt=self.itemCnt, totalPrice=self.totalCost)
            self.widgetList["widgetPaymentMain.html"].page().runJavaScript(jscmd)

        except Exception as e:
            print(e)

app = QApplication(sys.argv)
w = et()
pageConnector = w.makePageConnector()
w.show()
app.exec_()