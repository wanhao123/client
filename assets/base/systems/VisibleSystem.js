// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let eventComponent = require("EventComponent");
let globalData = require("GlobalData");

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

        onStartEventName : {
            default : eventComponent.startEventName,
        },
        trigger : {
            default : 0,
            type : cc.Float,
        },
    },

    editor : {
        // requireComponent : cc.Sprite,
        menu: "动作/瞬时动作/控制显示隐藏",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 注册监听消息
        if(this.onStartEventName.length > 0)
        {
            this.node.on(this.onStartEventName, this.eventCallback, this);
        }
    },

    // update (dt) {},

    // 监听事件回调
    eventCallback (arg1, arg2, arg3, arg4, arg5) {
        if(typeof(arg1) !== "number")
        {
            return;
        }

        this.node.active = arg1 > this.trigger;
    },

    onDestroy () {
        this.node.off(this.onStartEventName, this.eventCallback, this);
    }
});
