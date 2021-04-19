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
            throw new Error('no such animation: "${name}"');
        }
        this.current = name;
    }

    add_animation(name) {
        this.animations[name] = [];
    }

    add_frame(img, animation) {
        if (!(animation in this.animations)) {
            this.add_animation(animation);
            console.warn('no such animation: "${animation}", creating new...');
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
            ctx.drawImage(this.get_frame(), parent.x, parent.y);
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
