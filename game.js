// SELECT CVS
const cvs = document.getElementById("dragon");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI/180;

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

    dx: 2,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y,
        this.w, this.h);

        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y,
        this.w, this.h)
    },

    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
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

    radius : 12,

    frame: 0,

    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation: 0,

    draw : function() {
        let dragon = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, dragon.sX, dragon.sY, this.w, this.h, -this.w/2, -this.w/2,
        this.w, this.h);

        ctx.restore();
    },

    flap: function(){
        this.speed = - this.jump;
    },

    update: function(){
        // IF THE GAME IS GET READY STATE, THE DRAGON MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD 
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 TO 4. THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;

        if(state.current == state.getReady){
            this.y = 150;  // RESET TO START POSITION
            this.rotation = 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y + this.h/2 >= cvs.height - fg.h){
                this.y = cvs.height - fg.h - this.h/2;
                if(state.current == state.game){
                    state.current = state.over; 
                }
            }

            // IF THE SPEED IS GREATER THAN JUMP MEANS THE BIRD IS FALLING DOWN
            if(this.speed >= this.jump) {
                this.rotation = 45 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
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

// PIPES
const pipes = {
    position: [],

    top: {
        sX : 553,
        sY : 0
    },
    bottom: {
        sX : 502,
        sY : 0
    },

    w : 53,
    h : 400,
    gap : 100,
    maxYPos : -150,
    dx : 2,

    draw : function() {
        for(let i =0; i < this.position.length; i++){
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            // top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos,
            this.w, this.h);

            // bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos,
            this.w, this.h);
        }
    },

    update: function(){
        if(state.current !== state.game) return;

        if(frames%100 == 0){
            this.position.push({
                x : cvs.width,
                y: this.maxYPos * ( Math.random() + 1 )
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            let bottomPipesYPos = p.y + this.h + this.gap;

            // COLLISION DETECTION
            // TOP PIPE
            if(dragon.x + dragon.radius > p.x && dragon.x - dragon.radius < p.x + this.w && 
            dragon.y + dragon.radius > p.y && dragon.y - dragon. radius < p.y + this.h){
                state.current = state.over;
            }
            // BOTTOM PIPE
            if(dragon.x + dragon.radius > p.x && dragon.x - dragon.radius < p.x + this.w && 
            dragon.y + dragon.radius > bottomPipesYPos && dragon.y - dragon. radius < bottomPipesYPos + this.h){
                state.current = state.over;
            }

            //MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            
            // if the pipes fo beyond canvas, delete them from array
            if(p.x + this.w <= 0){
                this.position.shift();
            }
        }
    }
}

// DRAW
function draw(){
    ctx.fillStyle = "#70cbce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    dragon.draw();
    getReady.draw();
    gameOver.draw();
}

// UPDATE

function update() {
    dragon.update();
    fg.update();
    pipes.update();
}

// LOOP

function loop () {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();