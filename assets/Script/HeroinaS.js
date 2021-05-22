// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        _carregando: cc.Node,
    },
    onCollisionEnter: function (outro, eu) {
        if (!cc.isValid(this._carregando)) {
            this._carregando = outro;
        }
    },
    onLoad : function(){
        cc.director.getCollisionManager().enabled = true;        
    },
    update : function(dt) {
        if (cc.isValid(this._carregando)) {
            this._carregando.node.setPosition(this.node.position);
        }
    },
});