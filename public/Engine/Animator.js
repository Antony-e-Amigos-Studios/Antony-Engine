import Component from "./Component.js"

class Sprite {
    constructor(imgsrc, onload) {
        let img = new Image();
        img.onload = () => {onload(img)};
        img.src = imgsrc;
    }
}

function loadSprites(onload, ...srcs) {
    let loaded = 0; 
    let toload = srcs.length; //isso
    let imglist = {}; 
    srcs.forEach((src) => {
        loadSprite(src, (img) => { //carrega as img aq? //esse ..img retorna um array com todos os valores q vc coloco na função
            loaded++; // sim, ele chama essa outra func 
            imglist[src] = img;  //tipo se na fc ta sla("oi", "sla", "caraca", "foda", "q e isso") o array vai ser ["oi", "sla", "caraca", "fida", "q e isso"]
            console.log('loaded: ' + loaded); // ou perae mas é que tipo, essa função é a função que vai ser chamada aqui
            if (loaded == toload) {
                onload(imglist);
            }
        });
    });
}

function loadSprite(src, onload) { //então aonde q vc passa todas as img?
    let img = new Image();
    img.onload = () => {onload(img)}; // <- e aqui ele só passa img pra ela
    img.src = src;
    
}

class Animator extends Component {
    constructor() {
        super();
        this.frame = 0;
        this.current = "";
        this.anim_state = 0;
        this.animations = {};
        this.counter = 0;
        this.done_x = false;
        this.done_y = true;
        this.playing = false;
        this.vel = 1;
        this.inc = this.vel / 100;
    }

    set_current_animation(name) {
        if (!(name in this.animations)) {
            throw new Error(`no such animation: "${name}"`);
        }
        this.current = name;
    }

    get_current(){
      return this.current
    }

    get_frame(){
      return this.frame
    }

    set_frame(num) {
      this.frame = num;
    }

    add_animation(name) {
        this.animations[name] = [];
    }

    add_frame(img, animation) {
        if (!(animation in this.animations)) {
            this.add_animation(animation);
            console.warn(`no such animation: "${animation}", creating new...`);
        }
        this.animations[animation].push(img);
    }

    next_frame() {
        if (this.frame < this.animations[this.current].length - 1) {
            this.frame++;
        } else {
            this.frame = 0;
        }
    }

    prev_frame() {
        if (this.frame > 0) {
            this.frame--;
        }
    }

    get_frame() {
        return this.animations[this.current][this.frame];
    }

    update_frame() {
        this.counter += this.inc;
        if (Math.floor(this.counter) == 1) {
            this.next_frame();
            this.counter = 0;
        }
    }

    adjust_size(gameobj) {
        let img = this.get_frame();
        gameobj.w = img.width;
        gameobj.h = img.height;
    }
    
    update(ctx, parent) {
        if (this.get_frame() !== undefined && parent !== undefined) {
            ctx.drawImage(this.get_frame(), parent.cx, parent.cy, parent.w, parent.h);
        }
        if (this.playing) {
            this.update_frame();
        }
    }

    play() {
        this.playing = true;
    }

    stop() {
        this.playing = false;
    }

    set_velocity(val) {
        this.vel = val;
        this.inc = this.vel / 100;
    }
}

class SpriteSheetAnimator extends Animator {
    constructor(rows, cols) {
        super();
        this.spritesheet = null;
        this.cols = cols;
        this.rows = rows;
        this.srcX = 0;
        this.srcY = 0;
        this.frame = 1;
    }
 
    assoc_animations(anims, cols) {
        if (anims.length != cols.length) {
            throw new Error("arguments must be of the same length");
        }
        for (let i = 0; i < anims.length; i++) {
            this.animations[anims[i]] = cols[i];
        }
    }

    set_spritesheet(img) {
        this.spritesheet = img;
        this.sprite_width = this.spritesheet.width / this.cols;
        this.sprite_height = this.spritesheet.height / this.rows;
    }

    get_frame() {
      return {frame: this.frame, animation: this.current};
    }

    set_scale(scale) {
        this.scale = scale;
    }

    update_frame() {
        if (this.spritesheet){
            this.srcX = this.frame * this.sprite_width;
            this.srcY = this.animations[this.current] * this.sprite_height;
        }

        if (this.playing) {
          this.counter += this.inc;
          if (Math.floor(this.counter) == 1) {
              this.next_frame();
              this.counter = 0;
          }
        }
    }

    next_frame() {
        this.frame = ++this.frame % this.cols;
    }

    update(ctx, parent) {
      this.update_frame();
        if (this.scale === undefined) this.scale = 1;
        if (this.spritesheet)
            ctx.drawImage(  this.spritesheet, this.srcX, this.srcY,
                            this.sprite_width, this.sprite_height,
                            parent.cx, parent.cy,
                            this.sprite_width * this.scale,
                            this.sprite_height * this.scale  );
    }
}

export {Animator, SpriteSheetAnimator, Sprite, loadSprite, loadSprites};