import time
import threading
import os


# path 내부의 파일들을 list로 반환
def getHtmlPathList(dirName):
    pathDir = './' + dirName + '/'

    # pathDir에 있는 file/directory list 반환
    pathList = os.listdir(pathDir)

    # asset directory 제거
    pathList.pop(0)

    # 경로 리스트 반환
    for i in range(len(pathList)):
        pathList[i] = '/' + dirName + '/' + pathList[i]

    return pathList
