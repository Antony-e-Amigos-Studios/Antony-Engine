class NonEntityGameObject {
    constructor() {
        this.components = {};
    }

    add_component(name, component) {
        this.components[name] = component;
    }

    copy_component_list() {
        return this.components;
    }

    update_components(ctx) {
        for (let comp of Object.keys(this.components)) {
            this.components[comp].update(ctx, this);
        }
    }

    get(component) {
        return this.components[component];
    }

    has_component(name) {
        return name in this.components;
    }
}

class GameObject extends NonEntityGameObject {
    constructor(x, y, w, h, name) {
        super();
        this.x = x;
        this.y = y;
        this.initial_x = x;
        this.initial_y = y;
        this.cx = x;
        this.cy = y;
        this.w = w;
        this.h = h;
        this.name = name;
    }

    clone() {
        return this;
    }

    position_update() {
        this.cx = this.x;
        this.cy = this.y;
    }

    reset_position(x, y) {
        this.initial_x = x;
        this.initial_y = y;
    }

    // Getters and setters
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setScale(width, height) {
        this.w = width;
        this.h = height;
    }

    getPosition() {
        return [this.x, this.y];
    }

    getScale() {
        return [this.w, this.h];
    }

    move(x, y) {
        this.cx = this.x - x;
        this.cy = this.y - y;
    }
}