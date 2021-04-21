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
        this.scenes = {};
        this.scene = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        if (this.width >= 500) {
            this.width = 600;
            this.height = 600;
        }
        // me segue
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
        this.draw(this.ctx); // apaguei essa linha sem qrer fds
        for (let ent of this.entities) {
            ent.update();
            ent.update_components(this.ctx);
            if (this.scene !== "") {
                this.get_current_scene().draw(this.ctx);
            }
        }

        window.requestAnimationFrame(this.gameLoop);
    }

    add_entity(entity) {
        this.entities.push(entity);
    }

    create_scene(name, scene) {
        this.scenes[name] = scene;
    }

    get_current_scene(){
        if (this.scene !== "") {
            return this.scenes[this.scene];
        }
    }

    set_current_scene(name) {
        if (name in this.scenes) { // if key exists
            this.scene = name;
        }
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);

        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}