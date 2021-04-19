class GameObject {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.componentList = [];
    }

    add_component(component) {
        this.componentList.push(component);
    }

    copy_component_list() {
        return this.componentList;
    }

    update_components() {
        let i = 0;
        while (i < this.componentList.length) {
            this.componentList[i].update(this);
            i++;
        }
    }

    draw() {

    }

    update() {

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