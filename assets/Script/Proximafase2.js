// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function () {
        this.node.on('mousedown', this.proximaCena);
        if ('touches' in cc.sys.capabilities) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.proximaCena, this);
        }
        let canvas = cc.find("Canvas");
        canvas.on('fase-concluida', (val)=>this.faseConcluida(val));
    },
    proximaCena: function (envent) {
        if (this.podePassar==false){
            return;
        }
        cc.director.loadScene('Cena3');
    },
    faseConcluida: function (passou) {
        this.podePassar=passou;
        this.node.opacity = 255;
    },
    start () {

    },

    // update (dt) {},
});

