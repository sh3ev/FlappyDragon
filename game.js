// SELECT CVS
const cvs = document.getElementById("dragon");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;

// LOAD SPRITE IMAGES
const sprite = new Image();
sprite.src = 'img/sprite.png';

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

// CONTROL THE GAME
cvs.addEventListener("click", function(evt) {
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            dragon.flap();
            break;
        case state.over:
            state.current = state.getReady;
            break;
    }
});

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

    gravity : 0.25,
    jump : 4.6,
    speed : 0,

    draw : function() {
        let dragon = this.animation[this.frame];
        ctx.drawImage(sprite, dragon.sX, dragon.sY, this.w, this.h, this.x-this.w/2, this.y-this.w/2,
        this.w, this.h);
    },

    flap: function(){

    },

    update: function(){
        // IF THE GAME IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD 
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 TO 4. THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;

        if(state.current == state.getReady){
            
        }else{
            this.speed += this.gravity;
            this.y += this.speed;
        }
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
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
            this.w, this.h);
        }
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
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
            this.w, this.h);
        }

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
    dragon.update();
}

// LOOP

function loop () {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();