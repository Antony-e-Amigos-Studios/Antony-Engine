var game = new Game();
var player = new Player(0, 0, 100, 100);
var center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";

// bem vindo a parte mais bagunçada do codigo todo fodase >:)
// sim até pq essa parte nem é da engine ai a gente so taca calls pra nossa api
// totalmente fudida e com nomes incrivelmente bons
//
// player.add_component("animator", new Animator());
player.add_component("spriteanimator", new SpriteSheetAnimator()); // TODO

// player.get("spriteanimator").add_animation("idle");
player.get("spriteanimator").assoc_animations(["idle","back","left","right"],  [0,1,2,3]);

player.get("spriteanimator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
    // player.get("spriteanimator").add_frame(img, "idle");
};

var sprt_top = new Sprite("sprite.png", load_callback);

// calma ainda to fazendo isso aqui
var background = new Sprite("grama.jpg", (img) => {
    game.setbg(img);
});
// sim é doentio
// var sprt_top2 = new Sprite("top2.png", load_callback);

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

var tileManager = new TileManager();

let mapMatrix = [
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

let mapa = new Map(mapMatrix, tileManager, player.w);
let camera = new Camera(300, 300, player);

var sprt_tile1 = new Sprite("tile1.png", (img) => {
    tileManager.set(1, new Tile(img, "grama"));
    mapa.generateMap();
});
// olha o browser como ta gostoso
// mexe o personagem pro lado pq ele ta dentro do bloco 
// sim isso é manjado ja
// é bug no listener
// achei q 6 tava falando do bug dele ficar parado do nada
// e n andar pra lugar nenhum
// segura prum lado e pro outro
/// KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK VSFD
// eu fiz o negocio malfeito so pra fins de debugging
    // CARALHO ESQUECI DA TAREFA DE FILOSOFIA FUDEU pera xo da commit
    // ta lento saporra
    // calaboca meu pc tem 8gb ram V A G A B U N  D A 
mapa.enable_camera();
game.add_component("camera", camera);

game.create_scene("scene1", new Scene(mapa));
game.set_current_scene("scene1");

game.add_entity(player);
game.main();