class GameObject {
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
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

    component(cname) {
        
    }

    clone() {
        return this;
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
}