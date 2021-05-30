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
        velocidade: 1000,
        _direcao: cc.Vec2
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter: function (outro, eu) {
        if (this.node.group == outro.node.group){
            return;
        }
        let posicaoOutro  = new cc.Vec2(outro.node.position.x, outro.node.position.y);
        let direcao = posicaoOutro.sub(this.node.position);
        direcao = direcao.normalize();
        direcao.x = -1 * direcao.x;
        this._direcao = direcao;
    },
    start () {

    },

    update: function (dt) {
        let deslocamento = this._direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);
        if (this.node.x > (cc.winSize.width + this.node.width*this.node.scaleX) || this.node.x < (-1 * this.node.width*this.node.scaleX)){
            this.node.destroy();
        } else if (this.node.y > (cc.winSize.height + this.node.height*this.node.scaleY) || this.node.y < (-1 * this.node.height*this.node.scaleY)){
            this.node.destroy();
        }
    },  
});
