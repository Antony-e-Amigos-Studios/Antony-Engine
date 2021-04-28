import { GameObject } from './GameObject.js'
import { Animator } from "./Animator.js"

class Tile extends GameObject {
    constructor(texture) {
        super(0, 0, 0, 0);
        this.name = "generic tile";
        this.texture = texture;
        this.add_component("animator", new Animator());
        this.get("animator").add_frame(texture, "0");
        this.get("animator").set_current_animation("0");
        this.get("animator").adjust_size(this);
    }
}

export default Tile;