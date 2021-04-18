class Animator {
    constructor() {
        this.frame = 0;
        this.current = "";
        this.anim_state = 0;
        this.animations = {};
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

    add_frame(imgsrc, animation) {
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
}