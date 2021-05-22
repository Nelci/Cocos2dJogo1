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
        scaleLimit: cc.Vec2,
        scaleRate: cc.Vec2,
        resizeEmmited: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scaleLimit.x = this.node.scaleX;
        this.scaleLimit.y = this.node.scaleY;
        this.node.scale = 1;
    },
    update (dt) {
        if (this.node.scaleX > this.scaleLimit.x) {
            this.node.scaleX -= this.scaleRate.x;
        }
        if (this.node.scaleY > this.scaleLimit.y) {
            this.node.scaleY -= this.scaleRate.y;
        }
        if (this.resizeEmmited) {
            return
        }
        if (this.node.scaleX <= this.scaleLimit.x && this.node.scaleY <= this.scaleLimit.y) {
            this.resizeEmmited = true;
            this.node.emit("finish-resize",this);
        }
    },
});
