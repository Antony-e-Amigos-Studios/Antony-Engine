class Tile extends GameObject {
    constructor(texture, name) {
        super(0, 0, 0, 0);
        this.name = name;
        this.texture = texture;

        this.add_component("animator", new Animator());
        this.get("animator").add_frame(texture, "0");
        this.get("animator").set_current_animation("0");
        this.get("animator").adjust_size(this);
    }

    draw(ctx) {
        this.get("animator").update(ctx, this); // updating the animator == drawing
    }
}