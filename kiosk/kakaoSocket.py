from PyQt5.QtCore import *
import socket

# response를 위한 body
body = "loading..."
httpRes = "HTTP/1.1 200\r\n" \
          "Content-Type: text/html; charset=UTF-8\r\n" \
          "Content-Length: {len}\r\n" \
          "\r\n" \
          "{body}".format(len=len(body), body=body)


class getPg(QThread):
    notifyProgress = pyqtSignal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        self.exitFlag = 0
        self.server_socket = 0
        self.client_socket = 0

    def run(self):
        # 소켓 설정
        # localhost:8081로 pgToken과 함께 들어오는 http req를 받기 위한 socket
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind(('localhost', 8081))
        self.server_socket.listen(0)
        self.client_socket, addr = self.server_socket.accept()
        self.client_socket.setblocking(False)

        # data 한번만 받아옴
        while True:
            try:
                if self.exitFlag == 1:
                    break
                data = self.client_socket.recv(65535)
                if len(data) > 0:
                    break
            except Exception as e:
                pass

        if self.exitFlag == 0:
            # request url에서 pgToken 분리
            data = data.decode().split("pg_token=")[1].split(" ")[0]
            # http request에 맞는 response 전송
            self.client_socket.send(httpRes.encode())
            # pgToken 전송
            self.notifyProgress.emit(data)

        # 소켓 close
        self.client_socket.close()
        self.server_socket.close()

    def stop(self):
        self.exitFlag = 1
        self.quit()
        self.wait(1000)
