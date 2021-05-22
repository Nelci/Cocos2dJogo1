cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        velocidade: cc.Float,
    },

    update : function(deltaTime) {
        let deslocamento = this._direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(deslocamento);
    },

    setDirecao : function(direcao){
        this._direcao = direcao.normalize();
    }

});