class Tile extends GameObject {
    constructor(texture) {
        super(0, 0, 0, 0);
        this.name = "generic tile";
        this.texture = texture;
        this.add_component("animator", new Animator());
        this.get("animator").add_frame(texture, "0");
        this.get("animator").set_current_animation("0");
        this.get("animator").adjust_size(this); // mano o user n pode definir o tamanho do tile
                                                // o tilesize é calculado pela porra la
                                                // e ainda tem q dar resize na img dps
                                                // 
    }

    draw(ctx) {
        this.get("animator").update(ctx, this); // updating the animator == drawing
    }
}