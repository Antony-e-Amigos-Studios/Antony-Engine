var canvas, ctx, width, height;

class Animator {
    constructor () {
        this.frame      = 0;
        this.current    = "";
        this.anim_state = 0;
        this.animations = {[]};
    }

    set_current_animation (name) {
        if (!(name in this.animations)) {
            throw new Error('no such animation: "${name}"');
        }
        this.current = name;
    }

    add_animation (name) {
        this.animations[name] = [];
    }

    add_frame (imgsrc, animation) {
        if (!(animation in this.animations)) {
            this.add_animation(animation);
            console.warn('no such animation: "${animation}", creating new...');
        }
        img = new Image();
        img.onload = () => {
            this.animations[animation].push(img);
        };
        img.src = imgsrc;
    }

    next_frame () {
        if (frame <= this.animations[this.current].length) {
            frame++;
        } else {
            frame = 0;
        }
    }

    prev_frame () {
        if (frame > 0) {
            frame--;
        }
    }

    get_frame () {
        return this.animations[this.current][this.frame];
    }
}

class GameObject {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animator = undefined;
        this.textured = false;
    }

    create_animator () {
        this.animator = new Animator();
        this.textured = true;
    }
    
    draw (ctx) {
        if (!this.animated) {
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.animator.get_frame(),
                          this.x,this.y);
        }
    }

    update () {
    }
}

class Player extends GameObject{
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.xspd = 0;
        this.yspd = 0;
        this.width = 100;
        this.height = 100;
        this.sprite = "nada por enq";
        

        document.addEventListener('keydown',(e) => {
            if (e.key == "ArrowLeft") {
                this.xspd = -10;
            }
            if (e.key == "ArrowRight") {
                this.xspd = 10;
            }
            
            if (e.key == "ArrowDown") {
                this.yspd = 10;
            }
            if (e.key == "ArrowUp") {
                this.yspd = -10;
            }
        });
        document.addEventListener('keyup',(e) => {
            if (e.key == "ArrowLeft" || this.xstep == LEFT) {
                this.xspd = 0;
            }
            if (e.key == "ArrowRight" || this.xstep == RIGHT) {
                this.xspd = 0;
            }
            
            if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                this.yspd = 0;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.x, this.y, 100, 100);
    }

    update() {
        this.x += this.xspd;
        this.y += this.yspd;
    }
}

class Game {
    constructor() {
        this.xspd = 0;
        this.yspd = 0;
        this.entities = []; 
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        if (this.width >= 500) {
            this.width = 600;
            this.height = 600;
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;

    }

    /**
     * função foda que gera os bagulho
     */

    
    gameLoop() {
        this.draw(this.ctx);
        for (let ent of this.entities) {
            ent.draw(this.ctx);
            ent.update();
        }

        window.requestAnimationFrame(game.gameLoop);
        
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);
        
        setInterval(this.gameLoop.bind(this), 1000/60);
    }

    
}

var game = new Game();
var player = new Player(10,20);
game.entities.push(player);

game.main()




// TODO: function load_sprite
