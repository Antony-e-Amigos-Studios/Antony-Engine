import Game from "./Engine/Game.js";
import Player from "./Scripts/Player.js";
import { SpriteSheetAnimator, loadSprite, loadSprites } from "./Engine/Animator.js";
import { Camera, TileManager, Map } from "./Engine/Map.js";
import BasicMovement from "./Engine/miscComponents.js";
import Scene from "./Engine/Scene.js"
import Tile from "./Engine/Tile.js"
import { Audio, AudioPlayer } from './Engine/Audio.js'
import Multplayer from './Engine/Multplayer.js'

// entao, basicamente pra tudo funcionar tu tem que criar um game

// let audio = new Audio('ambient.mp3', 1, 'ambient', {loop: true});
// audio.Play();
// let players = {}
Multplayer.create_connetion()

var game = new Game();//x  y   w    h

var player = new Player(0, 0, 100, 100);
var center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";

player.add_component("spriteanimator", new SpriteSheetAnimator(4,3));

player.get("spriteanimator").assoc_animations(["idle","back","left","right"],  [0,1,2,3]);

player.get("spriteanimator").set_current_animation("idle");

// player2.get("spriteanimator").set_velocity(10);
// player2.get("spriteanimator").play();

// Multplayer.on('UpdatePlayers', data => {
//     players = data
//     for(let p in players){
//         let valls = players[p]
//         console.log(valls)
//     }
// })

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

Multplayer.emit('NewPlayer', {x:player.x, y:player.y, name:player.name, current:player.get("spriteanimator").current, frame:player.get("spriteanimator").frame})

player.add_component("movement", new BasicMovement(player, 5));

////////////////////////////Renderização do mapa///////////////////////////////////
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
//Ver isso aq
let tileManager = new TileManager();

let mapa = new Map(mapMatrix, tileManager, player.w);

const genMap = (imglist) => {
    tileManager.set(0, new Tile(imglist["grama.jpg"], "grama"));
    tileManager.set(1, new Tile(imglist["crate.png"], "crate"));
    tileManager.set(2, new Tile(imglist["tile1.png"], "thing"));
    mapa.generateMap();
};

//Ver isso aqui
loadSprites(genMap, "crate.png", "tile1.png", "grama.jpg");

let camera = new Camera(300, 300, player);
                            
mapa.enable_camera();
game.add_component("camera", camera);

game.create_scene("scene1", new Scene(mapa));
game.set_current_scene("scene1");
game.add_entity(player)
game.main();