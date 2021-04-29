import Component from './Component.js'

const RAIZ_DE_DOIS = Math.sqrt(2);

export default class BasicMovement extends Component {
    constructor(parent, velocity, keys=["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) {
        super();
        keys = keys
        this.parent = parent;
        this.keystates = {};
        this.keys = keys

        if (keys.length != 4) {
            throw new Error("must specify exactly 4 keys");
        }

        for (let i = 0; i < 4; i++) {
            this.keystates[this.keys[i]] = 0;
        }

        this.xspd = 0;
        this.yspd = 0;
        this.speed = velocity;
        this.addListeners();
    }

    update() {
        this.xspd2 = this.xspd;
        this.yspd2 = this.yspd;

        if (this.xspd && this.yspd) {
            this.xspd2 = this.xspd / RAIZ_DE_DOIS; // KKK
            this.yspd2 = this.yspd / RAIZ_DE_DOIS;
        }
        
        this.parent.x += this.xspd2;
        this.parent.y += this.yspd2;
        
    }

    addListeners() {
        document.addEventListener('keydown', (e) => {
            this.isMovev = true
            switch (e.key) {   
                case this.left():
                    this.xspd = -this.speed;
                    this.keystates[this.left()] = this.xspd;
                break;
                case this.right():
                    this.xspd = this.speed;
                    this.keystates[this.right()] = this.xspd;
                break;
                case this.down():
                    this.yspd = this.speed;
                    this.keystates[this.down()] = this.yspd;
                break;
                case this.up():
                    this.yspd = -this.speed;
                    this.keystates[this.up()] = this.yspd;
                break;
            }
        });

        document.addEventListener('keyup', (e) => {
            this.isMovev = false
            switch (e.key) {
                case this.left():
                    this.keystates[this.left()] = 0;
                    this.xspd = this.keystates[this.right()];
                break;
                case this.right(): 
                    this.keystates[this.right()] = 0;
                    this.xspd = this.keystates[this.left()];
                break;
                case this.down():
                    this.keystates[this.down()] = 0;
                    this.yspd = this.keystates[this.up()];
                break;
                case this.up():
                    this.keystates[this.up()] = 0;
                    this.yspd = this.keystates[this.down()];
                break;
            }
        });
    }

    up() {
        return this.keys[2];
    }

    down() {
        return this.keys[3];
    }

    left() {
        return this.keys[0];
    }

    right() {
        return this.keys[1];
    }

    set_spd(spd) {
      this.speed = spd;
    }
}