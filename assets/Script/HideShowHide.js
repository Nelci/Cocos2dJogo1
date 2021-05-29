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
        _sentido : 0,
        _alvo: cc.Node,
        _opacityRef: null,
        _haveChange: false,
        opacityChangeRate: 1,
        opacityTarget: 125
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._opacityRef = this.node.opacity;
        cc.director.getCollisionManager().enabled = true;
        this.node.on('start-change', this.startChange, this);
        this.node.on('stop-change', this.stopChange, this);
    },
    start () {

    },
    startChange: function (evnt) {
        if (this._haveChange){
            return;
        }
        this._haveChange = true;
        if (this.node.opacity < this.opacityTarget ){
            this._sentido = 1;
        } else if (this.node.opacity > this.opacityTarget) {
            this._sentido = -1;
        } else {
            this._sentido = 0;
        }
    },
    change: function (evnt) {
        if (!this._haveChange || !cc.isValid(this._alvo)){
            return;
        }
        if (this.node.opacity == this.opacityTarget) {
            return;
        }
        if (this._sentido > 0 && this.node.opacity > this.opacityTarget) {
            this.node.opacity = this.opacityTarget;
            return;
        }
        if (this._sentido < 0 && this.node.opacity < this.opacityTarget) {
            this.node.opacity = this.opacityTarget;
            return;
        }
        this.node.opacity += this._sentido * this.opacityChangeRate;

    },
    stopChange: function (evnt) {
        if (!this._haveChange){
            return;
        }    
        this._haveChange = false;
        this._sentido = 0;
        if (this.node.opacity != this.opacityTarget) {
            this.node.opacity = this._opacityRef;
        }
    },
    onCollisionEnter(outro, eu) {
        if (this.node.group != outro.node.group){
            return;
        }
        if (cc.isValid(this._alvo)){
            return;
        }

        this._alvo = outro
        
    },
    
    update (dt) {
        if (!this._haveChange){
            return;
        }        
        this.change();
    },
});
