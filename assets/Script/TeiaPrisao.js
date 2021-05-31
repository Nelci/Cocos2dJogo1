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
        teiaPrefab: cc.Prefab,
        prisaoPrefab: cc.Prefab,
        pontos: 100, 
        _colidiu: false,
        _teia: cc.Node,
        _canvas: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._canvas = cc.find("Canvas");
        // this.node.on("mousemove", this.mudarDirecao, this);
        this.node.on("mousedown", this.surgeTeia, this);
        cc.director.getCollisionManager().enabled = true;

        if ('touches' in cc.sys.capabilities) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.surgeTeia, this);
            // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mudarDirecao, this);
            // this.node.on(cc.Node.EventType.TOUCH_END, this.atirar, this)
        }
    },
    onCollisionEnter: function (outro, eu) {
        this._colidiu = true;
    },
    onCollisionExit: function (outro, eu) {
        this._colidiu = false;
    },
    surgeTeia(event){
        if (this._colidiu == false) {
            return;
        }
        if (cc.isValid(this._teia)) {
            return;
        }
        this._teia = cc.instantiate(this.teiaPrefab);
        this._teia.parent = this.node.parent;
        this._teia.position = this.node.position;
        this._teia.group = this.node.group;
        this._teia.on("finish-resize", (target)=> {
            target.node.destroy();
            this._canvas.emit('gera-ponto', this.pontos);
            this.node.destroy()
        });
    },
    onDestroy () {
        let goodvibe = cc.instantiate(this.prisaoPrefab);
        goodvibe.parent = this.node.parent;
        goodvibe.position = this.node.position;
        goodvibe.group = this.node.group;
    },
});