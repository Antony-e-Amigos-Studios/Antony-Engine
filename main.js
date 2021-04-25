import Game from "./Engine/Game.js";
import Player from "./Scripts/Player.js";
import { SpriteSheetAnimator, loadSprite, loadSprites } from "./Engine/Animator.js";
import { Camera, TileManager, Map } from "./Engine/Map.js";
import BasicMovement from "./Engine/miscComponents.js";
import Scene from "./Engine/Scene.js"
import Tile from "./Engine/Tile.js"
import { Audio, AudioPlayer } from './Engine/Audio.js'

// entao, basicamente pra tudo funcionar tu tem que criar um game

let audio = new Audio('ambient.mp3', 1, 'ambient', {loop: true});
audio.Play();

var game = new Game(); //x y   w    h
var player = new Player(0, 0, 100, 100);
var center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";

player.add_component("spriteanimator", new SpriteSheetAnimator(4,3));


player.get("spriteanimator").assoc_animations(["idle","back","left","right"],  [0,1,2,3]);

player.get("spriteanimator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
};

player.add_component("audioplayer", new AudioPlayer());
player.get("audioplayer").add_sounds(
            {url: "./Songs/WalkSongs/Dirt/Walk1.mp3", volume: 1, audioname: "walk1", options: {loop: true}},
            {url: "./Songs/WalkSongs/Dirt/Walk2.mp3", volume: 1, audioname: "walk2", options: {loop: true}},
            {url: "./Songs/WalkSongs/Dirt/Walk3.mp3", volume: 1, audioname: "walk3", options: {loop: true}});
player.get("audioplayer").set_current("walk1");

loadSprite("sprite.png", load_callback);

loadSprite("tile1.png", img => game.setbg(img));

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

player.get("audioplayer").on_stop_callback(() => {
    let mov = player.get("movement");
    if(!mov.xspd && !mov.yspd) {
        player.get("audioplayer").stop();
        player.get("audioplayer").set_current("", {on: true, from: ["walk1", "walk2", "walk3"]});
    }
});

var tileManager = new TileManager();

player.add_component("movement", new BasicMovement(player, 5));
// setInterval(()=>{
//     if(player.get("movement").isMove()){
//         let movementAudio = new Audio('Songs/WalkSongs/Dirt/Walk1.mp3', 1, 'Walk')
//         movementAudio.Play()
//     }
// }, 0)

let mapMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let mapa = new Map(mapMatrix, tileManager, player.w);

const genMap = (imglist) => {
    tileManager.set(1, new Tile(imglist["crate.png"], "crate"));
    tileManager.set(0, new Tile(imglist["grama.jpg"], "grama"));
    tileManager.set(2, new Tile(imglist["tile1.png"], "thing"));
    mapa.generateMap();
};

loadSprites(genMap, "crate.png", "tile1.png", "grama.jpg");

let camera = new Camera(300, 300, player);
mapa.enable_camera();
game.add_component("camera", camera);

game.create_scene("scene1", new Scene(mapa));
game.set_current_scene("scene1");

game.add_entity(player);
game.main();