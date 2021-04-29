import Component from './Component.js'

class Audio {
    constructor(url, volume=1, audioName, options){
        this.options = options
        this.audioName = audioName

        let audio = document.createElement('audio')
        let source = document.createElement('source')
        
        this.audio = audio
        audio.volume = volume;
        audio.loop = options?.loop || false;
        audio.id = audioName;
        document.querySelector('body').append(audio);
        source.src = url;
        source.type = options?.type || 'audio/mpeg'
        audio.append(source)
    }

    Play(){
        this.audio.play()    
    }
    
    Pause(){
        this.audio.pause()
    }

    Stop(){
        this.audio.pause()
        this.audio.currentTime = 0
    }

    SetVolume(volume){
        this.audio.volume = volume
    }
}

class AudioPlayer extends Component {
    constructor() {
        super();
        this.sounds = {};
        this.current = "";
        this.playing = false;
    }

    add_sounds(...sounds) {
        for (let sound of sounds) {
            this.sounds[sound.audioname] = new Audio(sound.url, sound.volume, sound.audioname, sound.options);
        }
    }

    set_current(audioname, choose_random={random: false, from: undefined}) {
        if (!choose_random.random) {
            this.current = audioname in this.sounds ? audioname : this.current;
        } else if (choose_random.from) {
            const from = choose_random.from;
            this.set_current(from[Math.floor(Math.random() * from.length)]);
        }
    }

    on_stop_callback(fn) {
        setInterval(()=>{
            if(!this.sounds[this.current].currentTime){
                fn(this.sounds[this.current]);
            }
        }, 500);
    }

    play(audioname=this.current) {
        if (!(audioname in this.sounds)) {
            throw new Error("invalid audioname");
        }
        this.current = audioname;
        if (!this.playing) {
            this.sounds[this.current].Play();
        }
        this.playing = true;
    }

    stop(audioname=this.current) {
        if (!(audioname in this.sounds)) {
            throw new Error("invalid audioname");
        }
        this.current = audioname;
        if (this.playing) {
            this.sounds[this.current].Stop();
        }
        this.playing = false;
    }

    update() {}
}

export { Audio, AudioPlayer };