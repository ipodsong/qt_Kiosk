from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage

class WebEnginePage(QWebEnginePage):
    # js 디버깅 함수 overriding
    # js의 console.log를 python terminal에 표시
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)