cc.Class({
    extends: cc.Component,

    properties: {
        direcao: cc.Vec2,
        _movimentacao : cc.Component,
    },

    onLoad : function(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this),
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this),
        this._movimentacao = this.getComponent("Movimentacao");
    },

    update : function(deltaTime) {
        this._movimentacao.setDirecao(this.direcao);
    },

    teclaPressionada : function(event){

    
    },

    teclaSolta : function(event){ 


    },
});
