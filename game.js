// SELECT CVS
const cvs = document.getElementById("dragon");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;

// LOAD SPRITE IMAGES
const sprite = new Image();
sprite.src = 'img/sprite.png';

//  BACKGROUND

const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
        this.w, this.h);

        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y,
        this.w, this.h)
    }

}

// FOREGROUND
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
        this.w, this.h);

        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y,
        this.w, this.h)
    }
}
// DRAGON
const dragon = {
    animation : [
        {sX: 446, sY : 112},
        {sX: 446, sY : 203},
        {sX: 446, sY : 171},
        {sX: 446, sY : 203}
    ],
    x: 50,
    y: 150,
    w: 52,
    h: 31,

    frame: 0,

    draw : function() {
        let dragon = this.animation[this.frame];
        ctx.drawImage(sprite, dragon.sX, dragon.sY, this.w, this.h, this.x-this.w/2, this.y-this.w/2,
        this.w, this.h);
    }
}

// GET READY MESSAGE
const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 -173/2,
    y : 80,

    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
        this.w, this.h);
    }

}

// GAME OVER MESSAGE
const gameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 -225/2,
    y : 90,

    draw: function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
        this.w, this.h);
    }

}

// DRAW
function draw(){
    ctx.fillStyle = "#70cbce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    dragon.draw();
    getReady.draw();
    gameOver.draw();
}

// UPDATE

function update() {

}

// LOOP

function loop () {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();