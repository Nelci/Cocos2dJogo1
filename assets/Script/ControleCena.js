// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let Globals = require("Globals");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _totalConvertido: 0,
        _canvas: null,
        _timer: null,
        tempoMaxCenaMs: 60 * 1000,
        minimo: 300,
        cena: 'cena1'
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._canvas = cc.find("Canvas");
        this._canvas.on('gera-ponto', (val)=>this.contaPonto(val), this);
        this._timer = setTimeout(()=>{
            cc.director.loadScene('CenaGameOver');
        },this.tempoMaxCenaMs);
    },
    contaPonto (val) {
        this._totalConvertido += val;
        Globals[this.cena].score = this._totalConvertido;
        if (this._totalConvertido >= this.minimo) {
            clearTimeout(this._timer);
            this._canvas.emit('fase-concluida', true);
        }
    }
    // update (dt) {},
});
