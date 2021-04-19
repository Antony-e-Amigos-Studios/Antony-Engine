class Tile extends GameObject {
    constructor(w,h,texture) {
        super(0,0,w,h);
        this.add_component("animator",new Animator());
        this.components["animator"].add_frame(texture,"0");
        this.components["animator"].set_current_animation("0");
    }
}

class Clone_Tile extends GameObject {
    constructor(tile) {
        super(0,0,tile.w, tile.h);
        this.add_component("animator",new Animator());
        this.components["animator"].add_loaded_frame(tile.components["animator"].get_frame(),"0");
        this.components["animator"].set_current_animation("0");
    }
}