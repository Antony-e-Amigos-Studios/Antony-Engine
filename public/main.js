import Game from "./Engine/Game.js";
import Player from "./Scripts/Player.js";
import { SpriteSheetAnimator, loadSprite, loadSprites } from "./Engine/Animator.js";
import { Camera, TileManager, Map } from "./Engine/Map.js";
import BasicMovement from "./Engine/miscComponents.js";
import Scene from "./Engine/Scene.js"
import Tile from "./Engine/Tile.js"
import { Audio, AudioPlayer } from './Engine/Audio.js'
import Server from './Engine/Server.js'
import { Interface, Panel } from './Engine/Interface.js'

/**
    Essa e o script mãe, sem ele nada e executado
    Esse script e chamado para a insersão de GameObjects, Components e entre outros
    
    Sua utilização e obrigadorio 
*/


Server.create_connetion() //Não mecher!

new Audio('ambient.mp3', 0.1, 'ambient', { loop: true }).Play()
new Audio('Songs/Music/Theme1.mp3', 0.5, 'music', { loop: true }).Play()

const game = new Game();

const player = new Player(0, 0, 100, 100);

// bagulho mó inutil, é só centralizar o player normalmente ali po
// pode fazer o favor de tomar no seu cu?

const center = game.center(player);
player.reset_position(center.x, center.y);

player.name = "player";
player.add_component("spriteanimator", new SpriteSheetAnimator(4, 3));
player.get("spriteanimator").assoc_animations(["idle", "back", "left", "right"], [0, 1, 2, 3]);
player.get("spriteanimator").set_current_animation("idle");

/**
 * A @function on_load_sprits e executada apos o carregamento dos sprits 
*/
const on_load_sprits = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
};

player.add_component("audioplayer", new AudioPlayer());
player.get("audioplayer").add_sounds(
    { url: "./Songs/WalkSongs/Dirt/Walk1.mp3", volume: 1, audioname: "walk1", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk2.mp3", volume: 1, audioname: "walk2", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk3.mp3", volume: 1, audioname: "walk3", options: { loop: true } });

player.get("audioplayer").set_current("walk1");

loadSprite("sprite.png", on_load_sprits);
loadSprite("Img/water/water1.jpg", img => game.setbg(img));

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

player.get("audioplayer").on_stop_callback(() => {
    const mov = player.get("movement");
    if (!mov.xspd && !mov.yspd) {
        player.get("audioplayer").stop();
        player.get("audioplayer").set_current("", { random: true, from: ["walk1", "walk2", "walk3"] });
    }
});

// <---------- Inutiu no momento (não apagar) ---------->
// Server.emit('NewPlayer', { x: player.x, y: player.y, name: player.name, current: player.get("spriteanimator").current, frame: player.get("spriteanimator").frame })

player.add_component("movement", new BasicMovement(player, 5));

////////////////////////////Renderização do mapa///////////////////////////////////
import mapMatrix from './Matrixs/mapMatrix.js'
import treeMatrix from './Matrixs/treeMatrix.js'

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
const tileManager = new TileManager();
const treeManager = new TileManager();

const mapa = new Map(mapMatrix, tileManager, player.w);
const tree = new Map(treeMatrix, treeManager, player.w);

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

loadSprites(genMap, "Img/sand/sand.png", "tile1.png", "Img/grass/grama.jpg", "Img/water/water1.jpg");
loadSprites(genTree, "Img/tree/tree1.png", "Img/tree/palmtree.png");

const camera = new Camera(300, 300, player);

mapa.enable_camera();
tree.enable_camera();
game.add_component("camera", camera);
game.add_component("menu", new Interface(game));
game.get("menu").add_element("Painel", new Panel(0, 0, game.width, game.height, { color: "rgba(25, 25, 25, 0.5)" }))

game.add_entity(player);

game.create_scene("scene1", new Scene(
    mapa,
    tree
));

game.set_current_scene("scene1");
game.main();