import Reflux from 'reflux';
import Actions from './actions.js';
import Common from '../../js/common.js';

// Store作为消息订阅者这个角色，拥有的几个比较重要的方法：
// 1. listenTo: 监听指定的listenable的变化，从而执行回调（这里的listenable可以是Action，也可以是Store）
// 2. listenToMany: 监听指定的listenables（对象集合）变化，从而执行对应的回调（这里的listenables是一个对象，它的每一个值可以是action，也可以是store）
var StatusStore = Reflux.createStore({
    init: function () {
        //单个监听action
        /* this.listenTo(Actions.getList, "getList");
        this.listenTo(Actions.handleList, "handleList");
        this.listenTo(Actions.initPage, "initPage");
        this.listenTo(Actions.lastPage, "lastPage");
        this.listenTo(Actions.nextPage, "nextPage");
        this.listenTo(Actions.modifyConf, "modifyConf"); */
        //==>等价于，一次性监听多个
        this.listenToMany(Actions);
    },

    getList: function (page) {
        let _this = this;
        Common.getJSON('/manage/coupon/couponList', {
            page: page,
            limit: 10
        }, function (res) {
            if (res.status == 200) {
                let newOptions = {};
                let list = _this.handleList(res.data.list);
                let count = res.data.count;
                let all = Math.ceil(count / 10);
                newOptions.columns = list;
                newOptions.pageAll = all;
                
                _this.trigger(newOptions);
            }
        });
    },

    handleList: function(list) {
        let rules = {
            type: {
                "1": "折扣券",
                "2": "优惠券"
            },
            status: {
                "1": "可用"
            },
            scene: {
                "0": "所有场景"
            }
        };
        let len = list.length;
        let columns = [];
        for (let i = 0; i < len; i++) {
            var obj = {};
            obj.desc = list[i].desc;
            obj.type = rules.type[list[i].type];
            obj.amount = list[i].amount;
            obj.status = rules.status[list[i].status];
            obj.stint = list[i].stint == "0" ? "无限制" : "满" + list[i].stint + "元可用";
            obj.startTime = Common.formatTime(list[i].startTime);
            obj.endTime = Common.formatTime(list[i].endTime);
            obj.scene = rules.scene[list[i].scene];
            obj.prid = list[i].prid;
            columns.push(obj);
        }
        return columns;
    },

    lastPage: function(){
        let page = this.state.options.page;
        if (page > 1) {
            page--;
        }
        this.setState((prevState) => {
            Object.assign(prevState.options, { page: page });
        });
        this.getList(page);
    },

    nextPage: function(){
        let page = this.state.options.page;
        let pageAll = this.state.options.pageAll;
        if (page < pageAll) {
            page++;
        }
        this.setState((prevState) => {
            Object.assign(prevState.options, { page: page });
        });
        this.getList(page);
    },

    modifyConf: function(){

    }
});


export default StatusStore;