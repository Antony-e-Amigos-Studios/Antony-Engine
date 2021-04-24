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
player.add_component("spriteanimator", new SpriteSheetAnimator(4,3));

// player.get("spriteanimator").add_animation("idle");
player.get("spriteanimator").assoc_animations(["idle","back","left","right"],  [0,1,2,3]);

player.get("spriteanimator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
    // player.get("spriteanimator").add_frame(img, "idle");
};

var sprt_top = new Sprite("sprite.png", load_callback);

// calma ainda to fazendo isso aqui // pq a img n ta carregando carai SLA KKKKKKK wtf funfou do nada
var background = new Sprite("grass.png", (img) => { // É PQ N TA LÁ
    game.setbg(img);
});
// sim é doentio // consigo oq? MAGO SE LIGFA VO MANDAR A PROVA
// var sprt_top2 = new Sprite("top2.png", load_callback); sexo

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

var tileManager = new TileManager();

player.add_component("movement",new BasicMovement(player, 10));

let mapMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1]
];

let mapa = new Map(mapMatrix, tileManager, player.w);
let camera = new Camera(300, 300, player);

var sprt_tile1 = new Sprite("crate.png", (img) => {
    tileManager.set(1, new Tile(img, "grama"));
    mapa.generateMap();
});

mapa.enable_camera();
game.add_component("camera", camera);

game.create_scene("scene1", new Scene(mapa));
game.set_current_scene("scene1");

game.add_entity(player);
game.main();