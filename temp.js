class Sprite {
    constructor(imgsrc, onload) {
        let img = new Image();
        img.onload = () => {onload(img)};
        img.src = imgsrc;
    }
}

class SpriteSheetAnimator extends Component {
    // eu fiz isso yey :D
    constructor() {
        super();
        this.animations = {}; // row : "animation"
        this.spritesheet = null;
        // TODO: Pedir esse rows e cols pro user
        this.cols = 3;
        this.rows = 4;
        this.current = '';
        this.counter = 0;
        this.playing = false;
        this.srcX = 0;
        this.srcY = 0;
        this.frame = 1;
        this.vel = 1;
        this.inc = this.vel / 100;

    }

    set_current_animation(name) {
        if (!(name in this.animations)) {
            throw new Error(`no such animation: "${name}"`);
        }
        this.current = name;
    }

    attach_animation(col, animation) {
        this.animations[animation] = col;
    }

    add_spritesheet(img) {
        this.spritesheet = img;
    }

    set_velocity(val) {
        this.vel = val;
        this.inc = this.vel / 100;
    }

    get_frame() {
        // TODO: nao é a mesma coisa do Animator
    }

    set_scale(scale) {
        this.scale = scale;
    }

    update_frame() {
        // this.current_frame = ++this.current_frame % this.cols;
        this.sprite_width = this.spritesheet.width / this.cols;
        this.sprite_height = this.spritesheet.height / this.rows;
        this.srcX = this.frame * this.sprite_width;
        this.srcY = this.animations[this.current] * this.sprite_height;

        this.counter += this.inc;
        if (Math.floor(this.counter) == 1) {
            this.next_frame();
            this.counter = 0;
        }
        
        // console.log(this.srcX, this.srcY);

    }

    next_frame() {
        this.frame = ++this.frame % this.cols;
    }

    update(ctx, parent) {
        if (parent.has_component("camera")) {
            parent.cx = parent.initial_x;
            parent.cy = parent.initial_y;
        }
        if (this.scale === undefined) this.scale = 1;
        ctx.drawImage(this.spritesheet, this.srcX, this.srcY, this.sprite_width, this.sprite_height, parent.cx, parent.cy, this.sprite_width * this.scale, this.sprite_height * this.scale);

        if (this.playing) {
            this.update_frame();
        }
    }

    play() {
        this.playing = true;
    }

    pause() {
        this.playing = false;
    }

}

class Animator extends Component {
    constructor() {
        super();
        this.frame = 0;
        this.current = "";
        this.anim_state = 0;
        this.animations = {};
        this.counter = 0;
        this.playing = false;
        this.vel = 1;
        this.inc = this.vel / 100;
    }

    set_current_animation(name) {
        if (!(name in this.animations)) {
            throw new Error(`no such animation: "${name}"`);
        }
        this.current = name;
    }

    add_animation(name) {
        this.animations[name] = [];
    }

    add_frame(img, animation) {
        if (!(animation in this.animations)) {
            this.add_animation(animation);
            console.warn(`no such animation: "${animation}", creating new...`);
        }
        this.animations[animation].push(img);
    }

    next_frame() {
        if (this.frame < this.animations[this.current].length - 1) {
            this.frame++;
        } else {
            this.frame = 0;
        }
    }

    prev_frame() {
        if (this.frame > 0) {
            this.frame--;
        }
    }

    get_frame() {
        return this.animations[this.current][this.frame];
    }

    update_frame() {
        this.counter += this.inc;
        if (Math.floor(this.counter) == 1) {
            this.next_frame();
            this.counter = 0;
        }
    }

    adjust_size(gameobj) {
        let img = this.get_frame();
        gameobj.w = img.width;
        gameobj.h = img.height;
    }
    
    update(ctx, parent) {
        if (this.get_frame() !== undefined && parent !== undefined) {
            if (parent.has_component("camera")) {
                parent.cx = parent.initial_x;
                parent.cy = parent.initial_y;
            }
            ctx.drawImage(this.get_frame(), parent.cx, parent.cy, parent.w, parent.h);
                
        }
        if (this.playing) {
            this.update_frame();
        }
    }

    play() {
        this.playing = true;
    }

    stop() {
        this.playing = false;
    }

    set_velocity(val) {
        this.vel = val;
        this.inc = this.vel / 100;
    }
}



/**
 * Antony Game Engine
 * @author Magoninho and Tsukiiii
 * @copyright Copyright (c) 2021 Antony e Amigos Studios. All rights reserved
 */

class Game extends NonEntityGameObject {
    constructor() {
        super();
        this.xspd = 0;
        this.yspd = 0;
        this.entities = [];
        this.scenes = {};
        this.scene = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        if (this.width >= 500) {
            this.width = 600;
            this.height = 600;
        }
        // me segue
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw(ctx) {
        // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // ctx.fillRect(0, 0, this.width, this.height);
        

        
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        // this.draw(this.ctx); // apaguei essa linha sem qrer fds
        let background = new Image();
        background.src = "../grass.png";    
        background.onload = () => { // eu fiz a mesma coisa q aqui ja n precisa mais n
            this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
            for (let ent of this.entities) {
            ent.update();
            ent.position_update();
            ent.update_components(this.ctx);
            if (this.scene !== "") {
                this.get_current_scene().update(this.ctx);
            }
        }
        this.update_components();
        }
        window.requestAnimationFrame(this.gameLoop);
    }

    add_entity(entity) {
        this.entities.push(entity);
    }

    create_scene(name, scene) {
        this.scenes[name] = scene;
    }

    get_current_scene(){
        if (this.scene !== "") {
            return this.scenes[this.scene];
        }
    }

    set_current_scene(name) {
        if (name in this.scenes) { // if key exists
            this.scene = name;
        }
    }

    center(entity) {
        return {x:(this.width/2 - entity.w/2) + entity.x,
                y:(this.height/2 - entity.h/2) + entity.y};
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);

        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}

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
// var background = new Sprite("grama.jpg", (img) => {
//     game.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    
// });
// var sprt_top2 = new Sprite("top2.png", load_callback);

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();

var tileManager = new TileManager();

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