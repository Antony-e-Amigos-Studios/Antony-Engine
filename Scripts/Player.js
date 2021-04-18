class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.xspd = 0;
        this.yspd = 0;

        this.frame_counter = 0;

        document.addEventListener('keydown', (e) => {
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
        document.addEventListener('keyup', (e) => {
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

    draw(ctx) {
        if (!this.animated) {
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.animator.get_frame(),
                this.x, this.y);
        }
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