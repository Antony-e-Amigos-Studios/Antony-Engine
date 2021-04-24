class Sprite {
    constructor(imgsrc, onload) {
        let img = new Image();
        img.onload = () => {onload(img)};
        img.src = imgsrc;
    }
}

class Animator extends Component {
    constructor() {
        super();
        this.frame = 0;
        this.current = "";
        this.anim_state = 0;
        this.animations = {};
        this.counter = 0;
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
            if (parent.has_component("camera")) {
                parent.cx = parent.initial_x;
                parent.cy = parent.initial_y;
            }
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
    constructor() {
        super();
        this.spritesheet = null;
        this.cols = 3;
        this.rows = 4;
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

    set_scale(scale) {
        this.scale = scale;
    }

    update_frame() {
        // this.current_frame = ++this.current_frame % this.cols;
        
        if (this.spritesheet){
            this.srcX = this.frame * this.sprite_width;
            this.srcY = this.animations[this.current] * this.sprite_height;
        }

        this.counter += this.inc;
        if (Math.floor(this.counter) == 1) {
            this.next_frame();
            this.counter = 0;
        }
        
        // console.log(this.srcX, this.srcY);

    }

    next_frame() {
        this.frame = ++this.frame % this.cols;
    }

    update(ctx, parent) {
        if (parent.has_component("camera")) {
            parent.cx = parent.initial_x;
            parent.cy = parent.initial_y;
        }
        if (this.scale === undefined) this.scale = 1;
        if (this.spritesheet)
            ctx.drawImage(this.spritesheet, this.srcX, this.srcY,
                      this.sprite_width, this.sprite_height,
                      parent.cx, parent.cy,
                      this.sprite_width * this.scale,
                      this.sprite_height * this.scale);

        if (this.playing) {
            this.update_frame();
        }
    }

    play() {
        this.playing = true;
    }

}
