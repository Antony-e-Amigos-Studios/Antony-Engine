class Animator {
    constructor () {
        this.frame      = 0;
        this.current    = "";
        this.anim_state = 0;
        this.animations = {};
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
        let img = new Image();
        img.onload = () => {
            this.animations[animation].push(img);
            console.log("Loaded");
        };
        img.src = imgsrc;
    }

    next_frame () {
        if (this.frame < this.animations[this.current].length-1) {
            this.frame++;
        } else {
           this.frame = 0;
        }
    }

    prev_frame () {
        if (this.frame > 0) {
            this.frame--;
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
        this.onUpdate = [];
    }

    create_animator () {
        this.animator = new Animator();
        this.animated = true;
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
}

class Player extends GameObject{
    constructor (x, y, w, h) {
        super(x,y,w,h);
        this.xspd = 0;
        this.yspd = 0;

        this.frame_counter = 0;

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
            if (e.key == "ArrowLeft") {
                this.xspd = 0;
            }
            if (e.key == "ArrowRight") {
                this.xspd = 0;
            }
            
            if (e.key == "ArrowDown" || e.key == "ArrowUp") {
                this.yspd = 0;
            }
        });
    }

    update() {
        this.x += this.xspd;
        this.y += this.yspd;
        this.frame_counter += 0.01;
        if (Math.floor(this.frame_counter) == 1) {
            this.animator.next_frame();
            this.frame_counter = 0;
        }
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

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        this.draw(this.ctx);
        for (let ent of this.entities) {
            ent.draw(this.ctx);
            ent.update();
        }

        window.requestAnimationFrame(this.gameLoop); 
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);    
        
        setInterval(this.gameLoop.bind(this),1000/60);
    } 
}

var game = new Game();
var player = new Player(10,20,100,100);

player.create_animator();
player.animator.add_frame("top.png","idle");
player.animator.add_frame("top2.png", "idle");
player.animator.set_current_animation("idle");

game.entities.push(player);
game.main()
