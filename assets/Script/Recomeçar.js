// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tempoGameOverMs:5000,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        setTimeout(()=>{
            cc.director.loadScene('Start');   
        },this.tempoGameOverMs);
    },

    // update (dt) {},
});
