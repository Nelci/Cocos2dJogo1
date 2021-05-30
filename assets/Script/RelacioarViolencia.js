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
    },
    onCollisionEnter: function (outro, eu) {
        this.node.setPosition(this.originalPosition);
        this.node.opacity = 255;
        let mouseMove = this.node.getComponent('MouseMove');
        mouseMove.impedeMovimento = true;
    },
    start () {

    },

    // update (dt) {},
});
