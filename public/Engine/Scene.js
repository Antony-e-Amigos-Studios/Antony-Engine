export default class Scene {
    constructor(...generatedMap) {
        this.map = [...generatedMap];
        // this.map.push(generatedMap);

    }

    update(ctx) {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i].update(ctx);
        }
    }
}