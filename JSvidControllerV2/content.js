var video = document.querySelector("body > video");
var click = 0
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