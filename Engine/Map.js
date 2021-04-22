/**
 * gustavo é furry
 */
class TileManager {
    constructor(initial = {}) {
        this.mapper = initial;
    }

    get(name) {
        return this.mapper[name];
    }

    set(name, val) {
        this.mapper[name] = val;
    }

    options() {
        return Object.keys(this.mapper);
    }
}

class Map {
    constructor(map, tileManager, tilesize = 64) {
        this.map = map;
        this.w = map[0].length;
        this.h = map.length;
        this.tileManager = tileManager;
        this.tilesize = tilesize;
    }
    generateMap() {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                let current_tile = this.tileManager.get(this.map[i][j]);
                if (current_tile) {
                    this.map[i][j] = new Tile(current_tile.texture);
                    this.map[i][j].setScale(this.tilesize, this.tilesize);
                    this.map[i][j].x = j * this.tilesize;
                    this.map[i][j].y = i * this.tilesize;
                } else {
                    this.map[i][j] = null;
                }
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) { // olha que tesão esses { se alinhando
                if (this.map[i][j] !== null) {
                    this.map[i][j].draw(ctx);
                }
            }
        }
    }
}

// tive uma ideia vou colar ela aqui pq eu ja tava fazendo
// olha ali o map ok ne
// pra fazer uma camera o mapa primeiro precisa sair dos limites mas fodase dá pra fazer
class camera {
    constructor(width, height, target) {
        // essa é a minha ideia pera
        this.width = 100;
        this.height = 100;
    }

    apply(mapa) {
        // essa função vai aplicar a camera no mapa
    }

    update(target) {
        //essa função atualiza a camera a partir da posição do player
    }
} // ei magoninho, tem uma parada tipo
// o mapa vai ter que ficar mt grande
// tipo
// eu acho que a gente nao devia se preocupar tanto com a 
// camera agora nao, acho que ainda falta "polir" o bagulho do mapa 
// ainda bem que eu to fora dessa 😎
// isso, ainda mais se o tamanho dele n for o mesmo pro x e y, pq ai vai ter q fazer
// um mapa muito maior
// a minha ideia era

// mano se liga a minha ideia
// fazer uma LINGUAGEM pra tiling

// vai ser tipo:
// "map=(
//   1 1 1 1 1 /^\S?((?:[10] )+)$/
//   1 0 0 0 1
//   1 1 1 1 1
// )"
// da commit gososa vo dormi daqui a poko tambe
// sim mano tem umas parada q quero lembrar
/*
mano
eu vou ter que dormir agora,
faz o que voce tiver que fazer
commit em comentario? blz entao
ok
*/

// pra isso funcionar a lang tem que detectar o \n
// grande dia
// tsuki leitor de crafting interpreters 👍
// nem lembro mais o que o ? faz lol
// script.ATS
// Antony Tiling Script
// ele meio que ah sla fala ai