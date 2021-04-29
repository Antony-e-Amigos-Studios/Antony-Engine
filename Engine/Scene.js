export default class Scene {
    constructor(...generatedMaps) {
        this.layers = [...generatedMaps];

    }

    update(ctx) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].update(ctx);
        }
    }
}