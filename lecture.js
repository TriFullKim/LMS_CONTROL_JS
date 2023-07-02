/* LMS Constant */
const BUTTON_STYLE = 'height: 26px; position: absolute; left: 140px;';
const EMBED_URL = "https://ucc.pknu.ac.kr/em/";
const LMS_URL = "https://lms.pknu.ac.kr/ilos/st/course/online_view_form.acl";

const INTRO = "https://ucc.pknu.ac.kr/settings/viewer/uniplayer/intro.mp4";
const PRELOADER = "https://ucc.pknu.ac.kr/viewer/uniplayer/preloader.mp4"

/* LMS lecture link scrapper */
let OPENED_EM;
let downloadButton = document.createElement('div');

/* Video Controller Const */
let video = document.querySelector("body > video");
let click = 0

const video_controller = ()=>{
    document.addEventListener('keydown', function(event) {
        if(event.key == "a"||event.key == "A") {
            video.currentTime += -30;
        }
        else if(event.key == "s"||event.key == "S") {
            video.currentTime += -10;
        }
        else if(event.key == "d"||event.key == "D") {
            video.currentTime += 10;
        }
        else if(event.key == "f"||event.key == "F") {
            video.currentTime += 30;
        }
        else if(event.key == "q"||event.key == "Q") {
            video.playbackRate = 1.6;
        }
        else if(event.key == "w"||event.key == "W") {
            video.playbackRate += -0.2;
        }
        else if(event.key == "e"||event.key == "E") {
            video.playbackRate += 0.2;
        }
        else if(event.key == "r"||event.key == "R") {
            video.playbackRate = 1.0;
        }
        else if(event.key == "t"||event.key == "T"||event.key == ";"||event.key == ":") {
            if (click%2==0){ video.volume = 0.0 }
            else { video.volume = 1.0 }
            click++
        }
    });
}

const lecture_getter = ()=>{
    window.onload = () => {
        const thisLocation = window.location.href;
        if (thisLocation.includes(LMS_URL)) {
            /**
             * "LMS에서"
             * 1. player에 'GetLectureLink'버튼 추가하기
            */
            const playerMenu = document.getElementById('menu');
            // <TAGNAME class = ""
            downloadButton.classList.add('contents-view-btn');
            downloadButton.classList.add('contents-view-btn-left');
            downloadButton.classList.add('contents-view-btn-title');
            // style = ""
            downloadButton.setAttribute('style', BUTTON_STYLE);
            // >
            downloadButton.innerHTML = 'GetLectureLink';
            // </TAGNAME>
            playerMenu.children[0].appendChild(downloadButton);
        } else {
            /**
             * ? : 당장들어가서 video를 얻으면 PRELOADER,
             *     playerButton을 누르자마자 바로 video를 얻으면 INTRO가 얻어짐.
             *     lecture link를 얻기 위해, player 버튼을 누르고 INTRO가 끝날 때까지 기다리가 video를 얻음.
            */
            console.log(`{DEBUG}    ---]    playerMenu가 FALSLY합니다.    [---`);

            /**
             *  "embed에서" 실행하는 코드 부분 ("LMS에서" 생성된 'GetLectureLink'버튼을 클릭 시 접속한 곳임)
             */
            const youtube_embed = document.querySelector("#silverlightControlHost > iframe:nth-child(1)");
            function find_video_link() {
                /**
                 * "embed에서" 스크랩한 video의 src가 INTRO, PRELOADER가 아닐 때까지
                 * 1. video.src를 계속 가져옴
                 */
                const video = document.querySelector("#video-play-video1 > div.vc-vplay-container.non-selectable > video");
                console.log(video);
                setTimeout(() => {
                    if (video.src === INTRO || video.src === PRELOADER) {
                        return find_video_link();
                    }
                    else {
                        window.self.close();
                        window.open(video.src);
                    }
                }, 500)
            }

            function find_playerButton_embed() {
                /**
                 * "embed에서"
                 * 1. Youtube embed 영상이면 열었던 embed를 닫고 바로 redirect 됩니다.
                 * 2. Youtube embed 영상이 아니면,
                 *    3. 'playerButton'을 찾습니다.
                 *       4. 찾으면, 'playerButton'을 찾으면 클릭합니다.
                 *       5. 클릭 후, video_link를 찾습니다.
                 */
                const EM_playerButton = document.querySelector("#front-screen > div > div.vc-front-screen-btn-container > div.vc-front-screen-btn-wrapper.video1-btn > div");
                console.log(EM_playerButton);
                setTimeout(() => {
                    if (youtube_embed) {
                        window.self.close();
                        window.open(youtube_embed.src);
                        return;
                    }

                    if (EM_playerButton) {
                        EM_playerButton.click();
                        find_video_link();
                        return EM_playerButton;
                    }
                    else {
                        return find_playerButton_embed();
                    }
                }, 50)
            }
            find_playerButton_embed();

            return;
        }
    };

    downloadButton.addEventListener('click', () => {
        /**
         * 'LMS에서'
         * 1. 'GetLectureLink'버튼을 클릭시 'embed'링크를 받음.
         * 2. 해당 링크를 새창에서 연다.
        */
        const LINK = document.querySelector("#contentViewer");
        let info = LINK.src.split("/");
        info = info[info.length - 1].split("?");
        info = info[info.length - 1].split("&");
        console.log(info);
        info = info[3].split("=")[1];
    
        const LECurl = info;
        console.log(decodeURIComponent(LECurl));
        OPENED_EM = window.open(decodeURIComponent(LECurl));
    })
}

/**
 * '볼 수 있는(manifest 참고)' 현재 페이지가 'video'가
 * 있으면, 
 * 1. 영상을 조정할 수 있는 함수 추가
 * 없으면,
 * 1. 강의 링크를 얻는 함수 추가
 */
if (video) 
    video_controller();
else
    lecture_getter();