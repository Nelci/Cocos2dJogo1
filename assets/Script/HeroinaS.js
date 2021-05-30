// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        tornadoPrefab: cc.Prefab,
        _tornado: null,
        _carregando: cc.Node,
    },
    onCollisionEnter: function (outro, eu) {
        if (!cc.isValid(this._carregando)) {
            this._carregando = outro;
        }
    },
    onLoad : function(){
        this.node.zIndex = 1;
        cc.director.getCollisionManager().enabled = true;
        this.node.on("mousedown", this.criaTornado, this);
        if ('touches' in cc.sys.capabilities) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.criaTornado, this);
        }
    },
    criaTornado: function (event) {
        if (cc.isValid(this._tornado)){
            return;
        }
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        this._tornado = cc.instantiate(this.tornadoPrefab);
        this._tornado.parent = this.node.parent;
        this._tornado.setPosition(posicaoMouse);
        this._tornado.group = this.node.group;
        this._tornado.on("end-move", (ev)=>{
            this._tornado.destroy();
        }, this)
        this._tornado.emit('mousedown', event);
    },
    // update : function(dt) {},
});