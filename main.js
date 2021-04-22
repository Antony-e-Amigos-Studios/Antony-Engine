var game = new Game();
var player = new Player(0, 0, 100, 100);
var center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";
player.add_component("animator", new Animator());

player.get("animator").add_animation("idle");
player.get("animator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("animator").add_frame(img, "idle");
    player.get("animator").adjust_size(player);
};

var sprt_top = new Sprite("top.png", load_callback);
var sprt_top2 = new Sprite("top2.png", load_callback);

player.get("animator").set_velocity(10);
player.get("animator").play();

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