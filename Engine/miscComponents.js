import Component from './Component.js'

export default class BasicMovement extends Component {
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

        this.xspd2 = this.xspd;
        this.yspd2 = this.yspd;

        if (this.xspd && this.yspd) {
            this.xspd2 = this.xspd / Math.sqrt(2);
            this.yspd2 = this.yspd / Math.sqrt(2); // escreve git add .
        }
        
        this.parent.x += this.xspd2;
        this.parent.y += this.yspd2;
    }

    addListeners() {
        // this.keys[0] -> left
        // this.keys[1] -> right
        // this.keys[2] -> up
        // this.down() -> down
        document.addEventListener('keydown', (e) => {
            switch (e.key) {   
                case this.left():
                    this.xspd = -this.speed; // se a tecla for pressionada o keystate
                                                // dessa tecla vai ser a velocidade do player
                                                // na direção dessa tecla
                                                // no caso do left, -10 ou -8 sla
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
            switch (e.key) {
                case this.left():
                    this.keystates[this.left()] = 0; // perceba q o keystate só vira 0 no keyup
                                                    // mais ou menos, a tecla que ainda não foi solta
                                                    // ta no keystate
                    this.xspd = this.keystates[this.right()]; // o keystate do left quando a tecla é soltada
                                                              // vira 0, que é o player parado
                                                              // aí ele coloca a velocidade x como sendo
                                                            // o keystate da tecla right
                                                            // ou seja, se a tecla right ainda nao tiver sido solta
                                                            // ele vai continuar indo pra direita pq o keystate
                                                            // do right ainda vai ser a velocidade dele pra direita
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
}
