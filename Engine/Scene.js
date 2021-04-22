class Scene {
    constructor(generatedMap) {
        this.map = generatedMap;
    }

    update(ctx) {
        this.map.update(ctx);
    }
}