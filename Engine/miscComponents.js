class BasicMovement extends Component {
    constructor(parent, velocity, keys=["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) {
        super();
        this.parent = parent;
        this.keystates = {};
        this.keys = keys;

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
        this.parent.x += this.xspd;
        this.parent.y += this.yspd;
    }

    addListeners() {
        // this.keys[0] -> left
        // this.keys[1] -> right
        // this.keys[2] -> up
        // this.keys[3] -> down
        document.addEventListener('keydown', (e) => {
            switch (e.key) {                
                case this.keys[0]:
                    this.xspd = -this.speed;
                    this.keystates[this.keys[0]] = this.xspd;
                break;
                case this.keys[1]:
                    this.xspd = this.speed;
                    this.keystates[this.keys[1]] = this.xspd;
                break;
                case this.keys[3]:
                    this.yspd = this.speed;
                    this.keystates[this.keys[3]] = this.yspd;
                break;
                case this.keys[2]:
                    this.yspd = -this.speed;
                    this.keystates[this.keys[2]] = this.yspd;
                break;
            }
        });
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case this.keys[0]:
                    this.keystates[this.keys[0]] = 0;
                    this.xspd = this.keystates[this.keys[1]];
                break;
                case this.keys[1]:
                    this.keystates[this.keys[1]] = 0;
                    this.xspd = this.keystates[this.keys[0]];
                break;
                case this.keys[3]:
                    this.keystates[this.keys[3]] = 0;
                    this.yspd = this.keystates[this.keys[2]];
                break;
                case this.keys[2]:
                    this.keystates[this.keys[2]] = 0;
                    this.yspd = this.keystates[this.keys[3]];
                break;
            }
        });
    }
}
