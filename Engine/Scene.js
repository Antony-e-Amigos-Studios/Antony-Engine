class Scene {
    constructor(generatedMap) {
        this.map = generatedMap;
    }

    draw(ctx) {
        this.map.draw(ctx);
    }
}