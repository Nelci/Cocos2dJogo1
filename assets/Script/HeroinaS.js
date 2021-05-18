// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        direcao: cc.Vec2,
        velocidade: 2,
        floatVelocity: 1,
        floatTilt: 20,
        positionRef: cc.Vec2,
        haveFloat: true,
    },

    onLoad : function(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this),
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this)
        this.positionRef = this.node.position;
    },
    teclaPressionada : function(event){
        if (this.haveFloat){
            this.direcao.x = 0;
            this.direcao.y = 0;
        }
        if(event.keyCode == cc.KEY.a){
            this.direcao.x = -1 * this.velocidade;
            this.haveFloat = false;
        }
        if(event.keyCode == cc.KEY.d){
            this.direcao.x = 1 * this.velocidade;
            this.haveFloat = false;
        }
        if(event.keyCode == cc.KEY.w){
            this.direcao.y = 1 * this.velocidade;
            this.haveFloat = false;
        }
        if(event.keyCode == cc.KEY.s){
            this.direcao.y = -1 * this.velocidade;
            this.haveFloat = false;
        }
    },
    teclaSolta : function(event){
        if(event.keyCode == cc.KEY.a){
            this.direcao.x = 0;
            this.positionRef.x=this.node.x;
            this.haveFloat = true;
        }
        if(event.keyCode == cc.KEY.d){
            this.direcao.x = 0;
            this.positionRef.x=this.node.x;
            this.haveFloat = true;
        }
        if(event.keyCode == cc.KEY.w){
            this.direcao.y = 0;
            this.positionRef.y=this.node.y;
            this.haveFloat = true;
        }
        if(event.keyCode == cc.KEY.s){
            this.direcao.y = 0;
            this.positionRef.y=this.node.y;
            this.haveFloat = true;
        }
    },
    ajusteFloatDirection: function() {
        if (this.node.y < (this.positionRef.y-this.floatTilt)
        || this.node.y > (this.positionRef.y+this.floatTilt)){
            this.direcao.y = -this.direcao.y
        }
        if (this.direcao.y==0){
            this.direcao.y=this.floatVelocity
        }
    },
    update : function(dt) {
        if (this.haveFloat) {
            this.ajusteFloatDirection();
        }
        this.node.position = this.node.position.add(this.direcao);
    },
});