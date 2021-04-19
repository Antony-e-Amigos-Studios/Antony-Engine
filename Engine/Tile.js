class Tile extends GameObject {
    constructor(texture, name) {
        super(0, 0, 0, 0);
        this.name = name;

        this.add_component("animator", new Animator());
        this.get("animator").add_frame(texture, "0");
        this.get("animator").set_current_animation("0");
        this.get("animator").adjust_size(this);
    }

    draw(ctx) {
        console.log("here");
        this.get("animator").update(ctx, this); // updating the animator == drawing
    }

    // plano foda: 
    // o que eu olho primeiro? a achei que 
    // fazer o bagulho
    // ó, pensa, como vc gosaria de adicionar um tile
    // primeiro vc vai ter que fazer um array mapa
    // aí acho que aquela ideia que tu teve la de fazer um dict pra cada valor no bagulho... n sei acho que é a unica opção pica
    // entao tipo
    // acho que o tile precisa de um bagulho tipo
    // calma to pensando
    // calma
    // tipo
    // '1' : new Tile(grama)

    /*
    var mapa = new Mapa(10, 10);
    vou fazer em um arquivo separado rapidão
    */
    // me ignora to pensando
}