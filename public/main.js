import Game from "./Engine/Game.js";
import Player from "./Scripts/Player.js";
import { SpriteSheetAnimator, loadSprite, loadSprites } from "./Engine/Animator.js";
import { Camera, TileManager, Map } from "./Engine/Map.js";
import BasicMovement from "./Engine/miscComponents.js";
import Scene from "./Engine/Scene.js"
import Tile from "./Engine/Tile.js"
import { Audio, AudioPlayer } from './Engine/Audio.js'
import Multplayer from './Engine/Multplayer.js'
import { Interface, Panel } from './Engine/Interface.js'

/**
    Essa e o script mãe, sem ele nada e executado
    Esse script e chamado para a insersão de GameObjects, Components e entre outros
    
    Sua utilização e obrigadorio 
*/


Multplayer.create_connetion() //Não mecher!

/* Não retirar, comentei pois a repedição do som era insuportavel */
let ambient = new Audio('ambient.mp3', 0.1, 'ambient', { loop: true })
let music = new Audio('Songs/Music/Theme1.mp3', 0.5, 'music', { loop: true })
ambient.Play()
music.Play();

var game = new Game();

var player = new Player(game.width / 2, game.height / 2, 100, 100);

// bagulho mó inutil, é só centralizar o player normalmente ali po
// var center = game.center(player);
// player.reset_position(center.x, center.y);

player.name = "player";
player.add_component("spriteanimator", new SpriteSheetAnimator(4, 3));
player.get("spriteanimator").assoc_animations(["idle", "back", "left", "right"], [0, 1, 2, 3]);
player.get("spriteanimator").set_current_animation("idle");

const load_callback = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
};


player.add_component("audioplayer", new AudioPlayer());
player.get("audioplayer").add_sounds(
    { url: "./Songs/WalkSongs/Dirt/Walk1.mp3", volume: 1, audioname: "walk1", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk2.mp3", volume: 1, audioname: "walk2", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk3.mp3", volume: 1, audioname: "walk3", options: { loop: true } });

player.get("audioplayer").set_current("walk1");

loadSprite("sprite.png", load_callback);

loadSprite("Img/water/water1.jpg", img => game.setbg(img));

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

player.get("audioplayer").on_stop_callback(() => {
    let mov = player.get("movement");
    if (!mov.xspd && !mov.yspd) {
        player.get("audioplayer").stop();
        player.get("audioplayer").set_current("", { on: true, from: ["walk1", "walk2", "walk3"] });
    }
});

Multplayer.emit('NewPlayer', { x: player.x, y: player.y, name: player.name, current: player.get("spriteanimator").current, frame: player.get("spriteanimator").frame })

player.add_component("movement", new BasicMovement(player, 5));

////////////////////////////Renderização do mapa///////////////////////////////////
let mapMatrix = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3],
    [3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3],
    [3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3],
    [3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
];

let treeMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * Isso é só eu brincando, depois eu tiro essas coisas ai
 * se voces quiserem claro
 * (mas eu acho que ficou uma bosta, é só brincadeira mesmo)
*/
for (let i = 3; i < treeMatrix.length; i++) {
    for (let j = 3; j < treeMatrix[0].length; j++) {
        treeMatrix[i][j] = Math.floor(Math.random() * 6);
        if (i < 5 || i > 18) {
            treeMatrix[i][j] = Math.floor(Math.random() * 6) + 7;
        } else if (j < 5 || j > 23) {
            treeMatrix[i][j] = Math.floor(Math.random() * 6) + 7;
        }
    }
}

//Ver isso aq
let tileManager = new TileManager();
let treeManager = new TileManager();

let mapa = new Map(mapMatrix, tileManager, player.w);
let tree = new Map(treeMatrix, treeManager, player.w);

const genTree = (imglist) => {
    treeManager.set(1, new Tile(imglist["Img/tree/tree1.png"], "tree"));
    treeManager.set(7, new Tile(imglist["Img/tree/palmtree.png"], "palmtree"));
    tree.generateMap();
}

const genMap = (imglist) => {
    tileManager.set(0, new Tile(imglist["Img/grass/grama.jpg"], "grama"));
    tileManager.set(1, new Tile(imglist["Img/sand/sand.png"], "crate"));
    tileManager.set(2, new Tile(imglist["tile1.png"], "thing"));
    tileManager.set(3, new Tile(imglist["Img/water/water1.jpg"], "water"));
    mapa.generateMap();
};



//Ver isso aqui
loadSprites(genMap, "Img/sand/sand.png", "tile1.png", "Img/grass/grama.jpg", "Img/water/water1.jpg");
loadSprites(genTree, "Img/tree/tree1.png", "Img/tree/palmtree.png");

let camera = new Camera(300, 300, player);

mapa.enable_camera();
tree.enable_camera();
game.add_component("camera", camera);
game.add_component("menu", new Interface(game))
game.get("menu").add_element("Painel", new Panel(0, 0, game.width, game.height, { color: "rgba(25, 25, 25, 0.5)" }))

game.add_entity(player);

game.create_scene("scene1", new Scene(
    mapa,
    tree
));

game.set_current_scene("scene1");
game.main();