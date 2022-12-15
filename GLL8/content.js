console.log(`{DEBUG}    ---]    ##comment##    [---`);

function not(bool) { return !(bool) }
function addButton_InMenu(buttonName,style='height: 26px;') {
    // <TAGNAME class = ""
    buttonName.classList.add('contents-view-btn');
    buttonName.classList.add('contents-view-btn-left');
    buttonName.classList.add('contents-view-btn-title');
    // style = ""
    buttonName.setAttribute('style', style);
    // >
    buttonName.innerHTML = 'GetLectureLink';
    // </TAGNAME>

    const playerMenu = document.getElementById('menu');
    console.log(playerMenu, not(playerMenu))
    if (playerMenu) {
        playerMenu.children[0].appendChild(buttonName);
    } else {
        console.log(`{DEBUG}    ---]    FUNCTION ERROR (0) - playerMenu가 FALSLY합니다.    [---`);
        return;
    }
}


// Global Variable
let LECTURE_FIELD
let downloadButton = document.createElement('div');
// ===============
window.onload = () => {
    const f1rstElement = document.body.children[0];
    console.log(`{DEBUG}    ---]    ${f1rstElement}    [---`);
    
    if (not(f1rstElement.children[0])) {
        // LMS학습창일때
        const ButtonStyle = 'height: 26px; position: absolute; left: 140px;';
        addButton_InMenu(downloadButton,ButtonStyle)

        LECTURE_FIELD = document.querySelector("#contentViewer")
        console.log(`{DEBUG}    ---]    LECTURE_FIELD: ${LECTURE_FIELD}    [---`);
        console.log(`{DEBUG}    ---]    End of Program (0)    [---`);
        return;
    } else if (f1rstElement.children[0].tagName === 'H1') {
        // 동영상 링크를 열었을때
        // 404이면 창 닫기
        if (f1rstElement.children[0].innerHTML === '서버 오류') {
            console.log(`{DEBUG}    ---]    End of Program (1)    [---`);
            window.close();
            return;
        }
    }
};


// Global Variable
const LECTURE_LAST_FORM = ['mobile/ssmovie.mp4', 'screen.mp4'];
// ===============
downloadButton.addEventListener('click', function() {
    if (LECTURE_FIELD) {
        const LECTURE_ORIGIN = LECTURE_FIELD.src.split('?')[1].split('&');
        const LECTURE_CODE = LECTURE_ORIGIN[5].split('=')[1];
        console.log(LECTURE_ORIGIN,LECTURE_CODE)

        let LECTURE_URL_ss = [];
        let lastFormat = LECTURE_LAST_FORM[0];
        for (var i = 0; i <= 5; i++) {
            LECTURE_URL_ss.push(`https://pknu.commonscdn.com/contents${i == 0 ? '' : i}/pknu100001/${LECTURE_CODE}/contents/media_files/${lastFormat}`)
            LECTURE_URL_ss[i] = window.open(LECTURE_URL_ss[i],'_blank')
    
            console.log(LECTURE_URL_ss);
        }

        let LECTURE_URL_sc = [];
        lastFormat = LECTURE_LAST_FORM[1];
        for (var i = 0; i <= 5; i++) {
            LECTURE_URL_sc.push(`https://pknu.commonscdn.com/contents${i == 0 ? '' : i}/pknu100001/${LECTURE_CODE}/contents/media_files/${lastFormat}`)
            LECTURE_URL_sc[i] = window.open(LECTURE_URL_sc[i],'_blank')
    
            console.log(LECTURE_URL_sc);
        }

    } else {
        console.log(`{DEBUG}    ---]    LECTURE_FIELD가 FALSLY 합니다. 현재URL: ${location.href}     [---`);
        return
    }
    console.log(`{DEBUG}    ---]    downloadButton - EventListener END    [---`);
});