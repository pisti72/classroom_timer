/*
TODO:
- scale digits
- loading bar
- fullscreen
- blender nixie, white numbers, roman numbers
- sound at finish
- fonts: egypt:bernard mt,high tower
        medieval: centaur
        neon blue:consolas,cordia,gadugi,gill,hp simplified
*/
const STATE_RUNNING = 0;
const STATE_STOPPED = 1;

var images = {
    nixie: {
        src: 'img/nixietube3.jpg',
        w: 70,
        h: 120,
        tile: [{
                x: 0,
                y: 0
            },
            {
                x: 70,
                y: 0
            },
            {
                x: 140,
                y: 0
            },
            {
                x: 210,
                y: 0
            },
            {
                x: 280,
                y: 0
            },
            {
                x: 350,
                y: 0
            },
            {
                x: 420,
                y: 0
            },
            {
                x: 490,
                y: 0
            },
            {
                x: 560,
                y: 0
            },
            {
                x: 630,
                y: 0
            }
        ]
    },
    whiteglow: {
        src: 'img/glowing_white.jpg',
        w: 84,
        h: 126,
        tile: [{
                x: 430,
                y: 200
            },
            {
                x: 26,
                y: 18
            },
            {
                x: 126,
                y: 18
            },
            {
                x: 226,
                y: 18
            },
            {
                x: 329,
                y: 18
            },
            {
                x: 429,
                y: 18
            },
            {
                x: 26,
                y: 201
            },
            {
                x: 126,
                y: 201
            },
            {
                x: 228,
                y: 201
            },
            {
                x: 329,
                y: 201
            }
        ]
    },
    neon: {
        src: 'img/neon.jpg',
        w: 84,
        h: 124,
        tile: [{
                x: 13,
                y: 15
            },
            {
                x: 101,
                y: 15
            },
            {
                x: 201,
                y: 15
            },
            {
                x: 290,
                y: 15
            },
            {
                x: 389,
                y: 15
            },
            {
                x: 13,
                y: 189
            },
            {
                x: 108,
                y: 189
            },
            {
                x: 198,
                y: 189
            },
            {
                x: 294,
                y: 189
            },
            {
                x: 388,
                y: 189
            }
        ]
    }
};

// var dlen = 8;
// var spaces = 3;
// var audio = document.createElement('audio');
// audio.src = 'alarm.mp3'
// audio.play();
var schema = 'neon';
var future = new Date();
//console.log(future.getTime());

var a = new Date();
var canvas = f("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
var url;
var size = 's';
urlParser();
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        toggleFullScreen();
    }
}, false);

window.addEventListener("blur", function(e) {
    console.log('focus lost');
    document.title = 'countdown';
}, false);

window.addEventListener("focus", function(e) {
    console.log('focus back');
}, false);

const MAGNIFY = 0.9;
// canvas.width = window.innerWidth-10;
// canvas.height = window.innerHeight-10;

// var scale = canvas.width / (images[schema].w * (dlen + spaces/2)) * MAGNIFY;
// var countdown_width = images[schema].w * (dlen + spaces/2) * scale;
// var countdown_height = images[schema].h * scale;
// var countdown_left = (canvas.width - countdown_width) / 2;
// var countdown_top = (canvas.height - countdown_height) / 2;
// countdown_left = 0;
img.src = images[schema].src;
img.addEventListener("load", function() {
    window.requestAnimationFrame(animate);
}, false);




function animate() {
    var d = new Date();
    var diff = future.getTime() - d.getTime(); //what???!!!
    if (diff < -3600000) {
        diff = -3600000;
    }
    a.setTime(diff);
    var digits = '';
    if (a.getHours() != 0) {
        digits = s(a.getHours()) + ":";
    }
    digits += s(a.getMinutes()) + ":" + s(a.getSeconds()) + ":" + s(a.getMilliseconds());

    var spaces = digits.split(':').length - 1;
    var dlen = digits.length - spaces;


    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    var scale = canvas.width / (images[schema].w * (dlen + spaces / 2)) * MAGNIFY;
    var countdown_width = images[schema].w * (dlen + spaces / 2) * scale;
    var countdown_height = images[schema].h * scale;
    var countdown_left = (canvas.width - countdown_width) / 2;
    var countdown_top = (canvas.height - countdown_height) / 2;
    var x = countdown_left;
    //if(Math.abs(diff)%5000>2500){
        cls(canvas.width, canvas.height);
        for (var i = 0; i < digits.length; i++) {
            if (digits[i] >= 0 && digits[i] <= 9) {
                drawDigit(digits[i], x, countdown_top, scale);
                x += images[schema].w * scale;
            } else {
                //space if not number
                x += images[schema].w * scale / 2;
            }
        }
    //}
    //console.log(Math.abs(diff)%50);
    document.title = s(a.getMinutes()) + ":" + s(a.getSeconds());
    
    window.requestAnimationFrame(animate);
}

function cls(w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
}

function drawDigit(c, x, y, scale) {
    for (var i = 0; i < 10; i++) {
        if (c % 10 == i) {
            ctx.drawImage(
                img,
                images[schema].tile[i].x,
                images[schema].tile[i].y,
                images[schema].w,
                images[schema].h,
                x,
                y,
                images[schema].w * scale,
                images[schema].h * scale
            );
        }
    }
}




function f(n) {
    return document.getElementById(n);
}

function s(n) {
    n = n + '';
    if (n.length == 1) {
        return '0' + n;
    }
    if (n.length == 2) {
        return n;
    }
    if (n.length == 3) {
        return n.substring(0, 2);
    }
}

function toggleFullScreen() {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
        //requestFullscreen is used to display an element in full screen mode.
        if ("requestFullscreen" in canvas) {
            canvas.requestFullscreen();
        } else if ("webkitRequestFullscreen" in canvas) {
            canvas.webkitRequestFullscreen();
        } else if ("mozRequestFullScreen" in canvas) {
            canvas.mozRequestFullScreen();
        } else if ("msRequestFullscreen" in canvas) {
            canvas.msRequestFullscreen();
        }
    }
}

function urlParser() {
    var url = window.location.href;
    var parameterArray = url.split('#');
    future.setTime(future.getTime() - 60 * 60 * 1000);
    for (var i = 0; i < parameterArray.length; i++) {
        if (parameterArray[i].indexOf('time=') != -1) {
            future.setTime(future.getTime() + parameterArray[i].substr(5) * 60 * 1000);
        } else {
            //ide sokszor bemegy
            //future.setTime(future.getTime() + 3*60*60*1000);
        }
        if (parameterArray[i].indexOf('style=') != -1) {
            //console.log(parameterArray[i]);
            var s = parameterArray[i].substr(6);
            if (s == 'n') {
                schema = 'nixie';
            }
            if (s == 'w') {
                schema = 'whiteglow';
            }
            if (s == 'b') {
                schema = 'neon';
            }
        }
        if (parameterArray[i].indexOf('digits=') != -1) {
            size = parameterArray[i].substr(7);
            // if(parameterArray[i].substr(2) == 's'){
            // dlen = 6;
            // spaces = 2;
            // }
            // if(parameterArray[i].substr(2) == 'm'){
            // dlen = 8;
            // spaces = 3;
            // }
            // if(parameterArray[i].substr(2) == 'l'){
            // dlen = 9;
            // spaces = 3;
            // }
        }
    }

}