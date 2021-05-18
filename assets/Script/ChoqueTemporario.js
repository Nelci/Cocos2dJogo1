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
        ChoquePrefab: cc.Prefab,
        tempoChoqueMs: 1000,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onCollisionEnter: function (outro, eu) {
        let choque = cc.instantiate(this.ChoquePrefab);
        choque.parent = this.node.parent;
        choque.position = this.node.position;
        choque.group = this.node.group;
        setTimeout(()=>{
            choque.destroy()   
        },this.tempoChoqueMs);
        this.node.destroy();
    },
    start () {
       

    },

    // update (dt) {},
});
