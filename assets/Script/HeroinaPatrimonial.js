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
        LuzPrefab: cc.Prefab,
        luz: cc.Node,
        _direcao: cc.Vec2,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.luz = null;
        
        cc.director.getCollisionManager().enabled = true;
        

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.mudarDirecao, this);
        canvas.on("mousedown", this.atirar, this);

        if ('touches' in cc.sys.capabilities) {
            canvas.on(cc.Node.EventType.TOUCH_START, this.mudarDirecao, this);
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.mudarDirecao, this);
            canvas.on(cc.Node.EventType.TOUCH_END, this.atirar, this)
        }
    },

    atirar: function (event) {
        let luz = cc.instantiate(this.luzPrefab);
        luz.parent = this.node.parent;
        luz.position = this.node.position;
        luz.group = this.node.group;
        let componenteTiro = luz.getComponent("Luz");
        componenteTiro.direcao = this._direcao;
        luz.setRotation(this._rotacao);
    },

    mudarDirecao: function (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);

        let direcao = posicaoMouse.sub(this.node.position);
        direcao = direcao.normalize();
        this._direcao = direcao;
        this._rotacao = (Math.atan2(direcao.x, direcao.y)) * 180 / Math.PI;
    },
    start() {
    },
  

   
    // update (dt) {},
});