import Component from './Component.js'

/*
    Não mecher, pois não esta completo!
    Esse component vai ser responsavel para fazer interfases como o menu
    Toda ideia e bem vinda :)
*/
class Interface extends Component{
    constructor(x, y, w, h, options=null){
        super()
        this.elements = {}
        this.options = options
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        let canvasNew = document.createElement('canvas')
        canvasNew.width = w
        canvasNew.height = h
        canvasNew.style.marginLeft = x
        canvasNew.style.marginTop = y
        canvasNew.id = "element"
        document.querySelector('body').appendChild(canvasNew)
        this.ctx = canvasNew.getContext('2d')
    }

    add_element(name, element){
        this.elements[name] = element
    }

    update(ctx, game) {
        this.ctx.clearRect(this.x, this.y, this.w, this.h)
        for(let i in this.elements){
            this.elements[i].drawElement(this.ctx)
        }
    }
}

class Element {
    constructor(x, y, w, h, options=null){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.options = options
    }
}

class Panel extends Element {
    constructor(x, y, w, h, options){
        super(x, y, w, h, options)
    }

    drawElement(ctx){
        ctx.fillStyle = this.options?.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

export { Interface, Element, Panel}