function openTab(url) { return window.open(url, '_blank') }
function closeTab(openedWindow) { setTimeout(() => { try { openedWindow.close(); } catch { console.log("안닫침 ㅅㄱ  ----  ", openedWindow) } }, 50); }
function when404Close(openedWindow, childTabResource, errorInspect = '404', returnValue = false) {
  let tmp = (childTabResource === errorInspect);
  if (tmp) { closeTab(openedWindow) }
  if (returnValue) { return tmp }
}

class pknuLecture {
  constructor() {
    this.basisInfo = ''
    this.youtubeInfo = ''
    this.kinxzoneTeacherID = ''
    this.kinxzoneLectureID = ''
    this.tabs = []
  }

  GETbasisInfo(JS_selectorWsrc) {
    var basisIndex = JS_selectorWsrc.indexOf("&cid=") + 5
    lec.basisInfo = JS_selectorWsrc.slice(basisIndex, basisIndex + 13);
  }

  GETkinxzoneInfo(JS_selectorWsrc) {
    var cutUrl = []
    cutUrl[0] = JS_selectorWsrc.indexOf('&path=https%3A%2F%2F') + '&path=https%3A%2F%2F'.length
    cutUrl[1] = JS_selectorWsrc.indexOf('.kinxzone.com')
    cutUrl[2] = cutUrl[1] + '.kinxzone.com'.length + 3 * 3 + 4 + cutUrl[1] - cutUrl[0]
    cutUrl[3] = JS_selectorWsrc.indexOf('&kind=')

    this.kinxzoneTeacherID = JS_selectorWsrc.slice(cutUrl[0], cutUrl[1])
    this.kinxzoneLectureID = JS_selectorWsrc.slice(cutUrl[2], cutUrl[3])

    console.log(JS_selectorWsrc.slice(cutUrl[0], cutUrl[1]), JS_selectorWsrc.slice(cutUrl[2], cutUrl[3]))
  }

  Url(urlType = 'normal', Vidtype = 'ss', i = 0) {
    var url = ''

    if (urlType == 'normal' || urlType == 'n' || urlType == 0) {
      if (Vidtype == 'ss' || Vidtype == 'ssmovie' || Vidtype % 3 == 0) {
        var last = 'mobile/ssmovie.mp4';
      }
      else if (Vidtype == 'sc' || Vidtype == 'screen' || Vidtype % 3 == 1) {
        var last = 'screen.mp4';
      }
      if (i % 6 == 0) { String(i); i = ''; } else { i = i % 6 } // i%6 == 0 이면 i = ''

      url = "https://pknu.commonscdn.com/contents" + i + "/pknu100001/" + this.basisInfo + '/contents/media_files/' + last
    }
    else if (urlType == 'specific' || urlType == 's' || urlType == 1) {
      if (Vidtype == 'KZ' || Vidtype == 'kinxzone' || Vidtype % 3 == 2) {
        lec.GETkinxzoneInfo(document.querySelector('body > ul > li:nth-child(2) > iframe').src)
        url = "https://" + this.kinxzoneTeacherID + ".kinxzone.com/name/" + this.kinxzoneTeacherID.replace('-', '_') + '/' + this.kinxzoneLectureID
      }
    }
    else {
      console.log("ERROR : wrong 'urlType'(" + urlType + ") --- There is 'normal'('n',0),'specific'('s',1)")
    }


    return url
  }

}