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
        ondaPrefab: cc.Prefab,
        onda: cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.onda = null;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        cc.director.getCollisionManager().enabled = true;
        

    },

    start() {
    },
    atirar: function () {
        this.onda = cc.instantiate(this.ondaPrefab);
        this.onda.parent = this.node.parent;
        this.onda.position = this.node.position;
        this.onda.group = this.node.group;

    },

    teclaPressionada: function (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            if (!cc.isValid(this.onda)){
                this.atirar();
            }
        }
    },

    teclaSolta: function (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this.onda.destroy();
        }
    },

    // update (dt) {},
});
