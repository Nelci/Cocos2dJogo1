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
        originalPosition: cc.Vec2,
        relacionado: false,
        _podeMover: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 1;
        this.originalPosition = new cc.Vec2(this.node.x,this.node.y);
        cc.director.getCollisionManager().enabled = true;
        this.node.on("mousedown", this.iniciaMovimento, this);
        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.move, this);
        this.node.on("mouseup", this.terminaMovimento, this);
        if ('touches' in cc.sys.capabilities) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.iniciaMovimento, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.terminaMovimento, this)
        }
    },
    iniciaMovimento: function() {
        if (this.relacionado == false) {
            this.node.emit("start-move",this);
            this._podeMover = true;
        }
    },
    move: function(event) {
        if( this._podeMover == true){
            let posicaoMouse = event.getLocation();
            posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
            this.node.setPosition(posicaoMouse);
        }
    },
    terminaMovimento: function() {
        if (this.relacionado == false) {
            this.node.emit("end-move",this);
            this._podeMover = false;
        }
    },
    onCollisionEnter: function (outro, eu) {
        this.node.setPosition(this.originalPosition);
        this.node.opacity = 255;
        this.relacionado = true;
        this._podeMover = false;
    },
    start () {

    },

    // update (dt) {},
});
