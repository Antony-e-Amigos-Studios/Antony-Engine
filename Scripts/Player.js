class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.xspd = 0; // ou magoninho rapidao, onde q tu ta colocando a img da grama no
                       // game? ok
        this.yspd = 0; // sigame

        document.addEventListener('keydown', (e) => {
            if (e.key == "ArrowLeft") {
                this.xspd = -10;
                this.get("spriteanimator").set_current_animation("left");
            }
            if (e.key == "ArrowRight") {
                this.xspd = 10;
                this.get("spriteanimator").set_current_animation("right");
            }

            if (e.key == "ArrowDown") {
                this.yspd = 10;
                this.get("spriteanimator").set_current_animation("idle");
            }
            if (e.key == "ArrowUp") {
                this.yspd = -10;
                this.get("spriteanimator").set_current_animation("back");
            }
            // caralho isso aqui tá muito bugado kkkkkkk
            // if (this.xspd != 0 && this.yspd != 0) {
            //     this.xspd /= 1.4141;
            //     this.yspd /= 1.4141;
            // }
        });
        document.addEventListener('keyup', (e) => {
            // this.get("spriteanimator").set_current_animation("idle");
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