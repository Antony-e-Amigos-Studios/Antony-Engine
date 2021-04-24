import Component from "./Component.js"

const socket = io();

// socket.on('PlayerUpdate', (data) => {
    
// })

class Multiplayer {
    
    static sendData(player) {
        socket.emit('PlayerData', {...player, id:socket.id})
    }
    
    static NewPlayer(player){
        setTimeout(()=>{
            socket.emit('PlayerEnter', {player, id:socket.id});
        }, 5);
    }

    static OnPlayerEnter (onPlayerEnter) {
        socket.on('PlayerAdd', onPlayerEnter);
    }

    static OnPlayerUpdate (onPlayerUpdate) {
        socket.on('PlayerUpdate', onPlayerUpdate);
    }
}

class SocketSpawner extends Component {
    constructor(parent) {
        super();
        this.data = {x: parent.x, y: parent.y, ...parent.get("spriteanimator").get_frame()};
        this.newData = {x: parent.x, y: parent.y, components: parent.components, initial_x: parent.initial_x, initial_y: parent.initial_y, w: parent.w, h: parent.h};
        this.first_update = true;
    }

    update(ctx, parent) {
        if (this.first_update) {
            Multiplayer.NewPlayer(this.newData.newd);
        }
        this.first_update = false;
        let temp = {x: parent.x, y: parent.y, ...parent.get("spriteanimator").get_frame()};

        let nChanged = 0;
        for (let key of Object.keys(temp)) { // <---------------------------|
            if (temp[key] != this.data[key]) {
                nChanged++;
                this.data[key] = temp[key];
            }
        }
        if (nChanged > 0) {
            Multiplayer.sendData(this.data);
        }

    }
}

export { Multiplayer, SocketSpawner };