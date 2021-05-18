// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        floatDirecao: cc.Vec2,
        floatVelocity: 1,
        floatTilt: 20,
        directionTilt: cc.Vec2,
        positionRef: cc.Vec2,
        haveFloat: true,
    },
    onLoad : function(){
        this.positionRef = this.node.position;
        this.floatDirecao = new cc.Vec2(0,0);
        this.node.on("start-move", (target) => this.startMove(target));
        this.node.on("end-move", (target) => this.endMove(target));
    },
    startMove: function(target){
        this.haveFloat = false;
        this.floatDirecao.x = 0;
        this.floatDirecao.y = 0;
    },
    endMove: function(){
        this.positionRef = this.node.position;
        this.haveFloat = true;
    },
    ajusteFloatDirection: function() {
        if (this.node.y < (this.positionRef.y-this.floatTilt)
        || this.node.y > (this.positionRef.y+this.floatTilt)){
            this.floatDirecao.y = -this.floatDirecao.y;
        }
        if (this.node.x < (this.positionRef.x-this.floatTilt)
        || this.node.x > (this.positionRef.x+this.floatTilt)){
            this.floatDirecao.x = -this.floatDirecao.x;
        }
        if (this.floatDirecao.y==0){
            this.floatDirecao.y = this.directionTilt.y ? this.floatVelocity : 0;
        }
        if (this.floatDirecao.x==0){
            this.floatDirecao.x = this.directionTilt.x ? this.floatVelocity : 0;
        }
    },
    update : function(dt) {
        if (this.haveFloat) {
            this.ajusteFloatDirection();
            this.node.position = this.node.position.add(this.floatDirecao);
        }
    },
});