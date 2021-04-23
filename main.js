var game = new Game();
var player = new Player(0, 0, 100, 100);
var center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";
// player.add_component("animator", new Animator());
player.add_component("spriteanimator", new SpriteSheetAnimator()); // TODO

// player.get("spriteanimator").add_animation("idle");
player.get("spriteanimator").attach_animation(0, "idle");
player.get("spriteanimator").attach_animation(1, "back");
player.get("spriteanimator").attach_animation(2, "left");
player.get("spriteanimator").attach_animation(3, "right");
player.get("spriteanimator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("spriteanimator").add_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
    // player.get("spriteanimator").add_frame(img, "idle");
};

var sprt_top = new Sprite("sprite.png", load_callback);

// calma ainda to fazendo isso aqui
var background = new Sprite("grama.jpg", (img) => {
    game.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
});
// var sprt_top2 = new Sprite("top2.png", load_callback);

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

var tileManager = new TileManager();

let mapMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

let mapa = new Map(mapMatrix, tileManager, player.w);
let camera = new Camera(300, 300, player);

var sprt_tile1 = new Sprite("tile1.png", (img) => {
    tileManager.set(1, new Tile(img, "grama"));
    mapa.generateMap();
});

mapa.enable_camera();
game.add_component("camera", camera);

game.create_scene("scene1", new Scene(mapa));
game.set_current_scene("scene1");

game.add_entity(player);
game.main();