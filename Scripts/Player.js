class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.xspd = 0;
        this.yspd = 0;

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
            if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
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
    }
}