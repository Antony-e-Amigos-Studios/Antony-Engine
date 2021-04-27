import { GameObject } from "../Engine/GameObject.js"
import Fps from '../Engine/Fps.js'
import Multplayer from '../Engine/Multplayer.js'

export default class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    
    update(game) {
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
                Multplayer.emit('UpdatePlayer', Multplayer.getId(), {x:this.x, y:this.y, name:this.name, current:this.get("spriteanimator").current, frame:this.get("spriteanimator").frame})
                this.get("audioplayer").play();
                this.get("spriteanimator").play();
            }
        }
        
        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.fillText(`Fps: ${Math.floor(Fps())}`, 10, 100); // debug
        
        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.fillText(this.get("camera").info["enabled"], 10, 200); // debug

        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.fillText(this.x, 10, 300); // debug
    }
}