export default class Server {
    static create_connetion(){
        this.socket = io()
    }

    static getId(){
        return this.socket.id
    }

    static emit(frequency, ...data){
        this.socket.emit(frequency, ...data)
    }

    static on(frequency, fc){
        this.socket.on(frequency, fc)
    }
} // ata cool