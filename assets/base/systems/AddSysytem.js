// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let eventComponent = require("EventComponent");

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
        onAddEventName : {
            default : eventComponent.startEventName,
        },
        onDevEventName : {
            default : eventComponent.endEventName,
        },
        scriptName : {
            default : "",
        },
    },

    editor : {
        // requireComponent : cc.Sprite,
        menu: "动态添加脚本",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 注册监听消息
        if(this.startEventName.length > 0)
        {
            this.node.on(this.startEventName, this.eventCallback, this);
        }
    },

    // 监听事件回调
    eventCallback (arg1, arg2, arg3, arg4, arg5) {
        let state = undefined;
        if(!arg1)
        {
            if(this.startEventName.substr(0, 5) === "gData")
            {
                state = globalData.getData(this.startEventName.substr(6));
            }
            else
            {
                return;
            }
        }
        else
        {
            if(typeof(arg1) !== "number")
            {
                return;
            }
            else
            {
                state = arg1
            }
        }

        
        let lastState = this.node.active;
        this.node.active = state > this.trigger;
        if(lastState !== this.node.active)
        {
            this.node.emit(this.endEventName);
        }
    },

    // update (dt) {},

    onDestroy () {
        this.node.off(this.startEventName, this.eventCallback, this);
    }
});
