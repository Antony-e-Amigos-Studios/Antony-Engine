class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.xspd = 0;
                       // game? ok
        this.yspd = 0; // vcs tao quebrano tudo?
        document.addEventListener('keydown', (e) => {
            if (this.get("spriteanimator"))
                this.get("spriteanimator").play();
            switch (e.key) {                
                case "ArrowLeft":
                    this.xspd = -10;
                    this.get("spriteanimator").set_current_animation("left");
                    break;
                case "ArrowRight":
                    this.xspd = 10;
                    this.get("spriteanimator").set_current_animation("right");
                    break;
                case "ArrowDown":
                    this.yspd = 10;
                    this.get("spriteanimator").set_current_animation("idle");
                    break;
                case "ArrowUp":
                    this.yspd = -10;
                    this.get("spriteanimator").set_current_animation("back");
                    break;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (this.get("spriteanimator"))
                this.get("spriteanimator").stop();
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