import { GameObject } from "../Engine/GameObject.js"

export default class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    update(game) {
        // to com preguiça de rearranjar esses ifs fodase
        if (this.get("movement")) {
            let mov = this.get("movement");
            if (mov.xspd > 0) { // direita
                this.get("spriteanimator").set_current_animation("right");
            } else if (mov.xspd < 0) { // esquerda 
                this.get("spriteanimator").set_current_animation("left");
            }

            if (mov.yspd > 0) { // baixo
                this.get("spriteanimator").set_current_animation("idle");
            } else if (mov.yspd < 0) { // cima
                this.get("spriteanimator").set_current_animation("back");
            }
            
            if (!mov.xspd && !mov.yspd) {
                // this.get("spriteanimator").set_current_animation("idle");
                this.get("spriteanimator").set_frame(0);
                this.get("spriteanimator").stop();
            } else {
                this.get("spriteanimator").play();
            }
        }
        
    }

    AnimFrame(){
        return this.get("spriteanimator")
    }
}