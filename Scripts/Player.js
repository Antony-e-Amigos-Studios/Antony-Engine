class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    update(game) {
        // to com preguiça de rearranjar esses ifs fodase
        if (this.get("movement")) {
            let mov = this.get("movement");
            if (mov.xspd > 0) {
                this.get("spriteanimator").set_current_animation("right");
            } else if (mov.xspd < 0) {
                this.get("spriteanimator").set_current_animation("left");
            }

            if (mov.yspd > 0) {
                this.get("spriteanimator").set_current_animation("idle");
            } else if (mov.yspd < 0) {
                this.get("spriteanimator").set_current_animation("back");
            }

            if (!mov.xspd && !mov.yspd) {
                this.get("spriteanimator").stop();
            } else {
                this.get("spriteanimator").play();
            }
        }
        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.fillText(`player: ${this.x}, ${this.y}`, 10, 100);
    }
}