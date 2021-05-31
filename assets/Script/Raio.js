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
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        direcao: cc.Vec2,
        velocidade: 10,
        pontos: 100,
        _canvas: null
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function () {
        this.direcao = this.direcao.normalize();
        this._canvas = cc.find("Canvas");
    },

    onCollisionEnter: function (outro, eu) {
        console.log("colidiu");
        outro.node.destroy();
        this._canvas.emit('gera-ponto', this.pontos);
        eu.node.destroy();
    },

    update: function (dt) {
        let deslocamento = this.direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);
    },  

})
