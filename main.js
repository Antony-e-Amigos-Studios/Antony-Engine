var canvas, ctx, width, height;

class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.sprite = "nada por enq";
        

        document.addEventListener('keydown',(e) => {
            switch (e.key) { // vsfd deprecated meu pau
                case "ArrowLeft":
                    this.x -= 10;
                    
                break;
                case "ArrowRight":
                    this.x += 10;
                break;
                case "ArrowDown":
                    this.y -= 10;
                break;
                case "ArrowUp":
                    this.y += 10;
                break;
            }
        });
    }

    draw(ctx) {
        // vou testar um desenho
        // pera
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.x, this.y, 100, 100);
    }

    update() {
        // this.x += 10;
        // this.y += 10;
    }
}

class Game {
    constructor() {
        this.xspd = 0;
        this.yspd = 0;
        this.entities = []; 
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        if (this.width >= 500) {
            this.width = 600;
            this.height = 600;
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;

    }

    /**
     * função foda que gera os bagulho
     */

    
    gameLoop() {
        this.draw(this.ctx);
        for (let ent of this.entities) {
            ent.draw(this.ctx);
            ent.update();
        }

        window.requestAnimationFrame(game.gameLoop);
        
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);
        
        setInterval(this.gameLoop.bind(this), 1000/60);
    }

    
}

var game = new Game();
var player = new Player(10,20);
game.entities.push(player);

game.main()




// TODO: function load_sprite
