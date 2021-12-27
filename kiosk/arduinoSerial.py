from PyQt5.QtCore import *
import serial

# 테스트 카드 번호 (서버에 등록되어있음)
testCreditCardId = "0x00000000"
testGdreamCardId = "0x00000001"

# testCreditCardId <- 신용카드 결제
# testGdreamCardId <- 지드림카드 결제
testmode = testGdreamCardId
# testmode를 변경하여 rfid 없이 테스트 가능

# rfid가 연결 된 USB 포트 이름을 넣어주세요
PORT = 'COM3'
BaudRate = 115200
try:
    arduinoConnection = serial.Serial(PORT, BaudRate)
except Exception as e:
    print("NFC 모듈 연결 실패")
    print("arduinoSerial.py 파일에 testmode를 변경하여 카드 결제 방법을 바꿀 수 있습니다.")
    print("연결했는데 실패하는경우 PORT 변수를 포트 이름에 맞게 변경하세요.")

class getSerial(QThread):
    notifyProgress = pyqtSignal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        self.exitFlag = 0
        self.line = 0

    def run(self):
        try:
            while True:
                # rfid 센서를 통해 card id를 받아옴
                # 형식(bytes) -> b'0x00000000H\r\n'
                self.line = arduinoConnection.readline()
                if len(self.line) > 0:
                    break
                if self.exitFlag == 1:
                    break

            if self.exitFlag == 0:
                # bytes -> str 형 변환
                self.line = str(self.line)

                # str 파싱
                # "b'0x00000000H\\r\\n'" -> "0x00000000"
                self.line = self.line.split("\'")[1].split("H")[0]

                # rfid를 통해 받아 온 card id를 전송
                self.notifyProgress.emit(self.line)


        except Exception as e:
            # testmode인 경우 사전에 설정 된 카드 id 전송
            self.notifyProgress.emit(testmode)

    def stop(self):
        self.exitFlag = 1
        self.quit()
        self.wait(1000)