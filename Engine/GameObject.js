class GameObject {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animator = undefined;
        this.textured = false;
        this.onUpdate = [];
    }

    create_animator() {
        this.animator = new Animator();
        this.animated = true;
    }

    draw(ctx) {
        if (!this.animated) {
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.animator.get_frame(),
                this.x, this.y);
        }
    }

    // Getters and setters

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setScale(width, height) {
        this.w = width;
        this.h = height;
    }

    getPosition() {
        return [this.x, this.y];
    }

    getScale() {
        return [this.w, this.h];
    }
}