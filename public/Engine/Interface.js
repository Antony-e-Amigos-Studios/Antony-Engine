import Component from './Component.js'

/*
    Não mecher, pois não esta completo!
    Esse component vai ser responsavel para fazer interfases como o menu
    Toda ideia e bem vinda :)
*/
class Interface extends Component{
    constructor(game, options=null){
        super()
        this.elements = {}
        this.game = game
        this.options = options
    }

    add_element(name, element){
        this.elements[name] = element
    }

    update(ctx, game) {
        // if (this.elements.lenght != 1) {
        //     this.elements.drawElement();
        // } else {
        //     for (let e in this.elements){
        //         e.drawElement()
        //     }
        // }
        // this.elements.drawElement(ctx)
    }
}

class Element {
    constructor(x=0, y=0, w=10, h=10, options=null){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.options = options
    }
}

class Panel extends Element{
    constructor(x, y, w, h, options){
        super(x, y, w, h, options)
    }

    drawElement(ctx){
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.fillStyle = this.options?.color
    }
}

export { Interface, Element, Panel}