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
        moving: false,
    },
    isEnableKeys: function(key) {
        return [
            cc.macro.KEY.a, 
            cc.macro.KEY.d, 
            cc.macro.KEY.w, 
            cc.macro.KEY.s
        ].indexOf(key) != -1;
    },
    onLoad : function(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        if ('touches' in cc.sys.capabilities) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.iniciaMovimento, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.terminaMovimento, this)
        }
    },
    iniciaMovimento: function() {
        this.node.emit("start-move",this);
    },
    move: function(event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        this.node.setPosition(posicaoMouse);
    },
    terminaMovimento: function() {
        this.node.emit("end-move",this);
    },
    teclaPressionada : function(event){
        if (this.isEnableKeys(event.keyCode) == false) {
            return
        }
        if (this.moving == false) {
            this.node.emit("start-move",this);
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.direcao.x = -1 * this.velocidade;
            this.node.scaleX = this.node.scaleX > 0 ? this.node.scaleX * -1 : this.node.scaleX;
        }
        if(event.keyCode == cc.macro.KEY.d){
            this.direcao.x = 1 * this.velocidade;
            this.node.scaleX = this.node.scaleX < 0 ? this.node.scaleX * -1 : this.node.scaleX;
        }
        if(event.keyCode == cc.macro.KEY.w){
            this.direcao.y = 1 * this.velocidade;
        }
        if(event.keyCode == cc.macro.KEY.s){
            this.direcao.y = -1 * this.velocidade;
        }
        this.moving = true;
    },
    teclaSolta : function(event){
        if (this.isEnableKeys(event.keyCode) == false) {
            return
        }
        if (this.moving == true) {
            this.node.emit("end-move",this);
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.direcao.x = 0;
        }
        if(event.keyCode == cc.macro.KEY.d){
            this.direcao.x = 0;
        }
        if(event.keyCode == cc.macro.KEY.w){
            this.direcao.y = 0;
        }
        if(event.keyCode == cc.macro.KEY.s){
            this.direcao.y = 0;
        }
        this.moving = false;
    },
    update : function(dt) {
        if (this.moving == true){
            this.node.position = this.node.position.add(this.direcao);
        }
    },
});