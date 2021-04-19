/**
 * Antony Game Engine
 * @author Magoninho and Tsukiiii
 * @copyright Copyright (c) 2021 Antony e Amigos Studios. All rights reserved
 */

class Game {
    constructor() {
        this.xspd = 0;
        this.yspd = 0;
        this.entities = [];
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        if (this.width >= 500) {
            this.width = 600;
            this.height = 600;
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        this.draw(this.ctx); // sim agora olha a função update da entidade
        for (let ent of this.entities) {
            ent.update();
            ent.update_components(this.ctx);
        }

        window.requestAnimationFrame(this.gameLoop);
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);

        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}