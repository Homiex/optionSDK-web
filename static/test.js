/* demo 演示项目 */
// 当前版本 v0.4.0.20190408
/* eslint-disable */

const $ = window.$;

// 演示代码，默认用测试账号执行了登录
window.userId = window.userId; // 测试账号
window.password = window.password; // 测试密码
window.localStorage.option_userId = window.userId;
window.localStorage.option_sessionId = window.sessionId;

// 初始化参数
window.FOTA_OPTION_CONFIG = window.FOTA_OPTION_CONFIG || {
    isDevelopment: true,
    socketHost: 'wss://api-test.fota.com/mapi/websocket',
    httpHost: 'https://api-test.fota.com/mapi/v1',
    // 申请的平台id
    brokerId: '',
    // SDK加载完成回调
    ready: function(optionManager) {
        // 调用业务代码
        window.demo.ready(optionManager);
    },
    // 特殊跳转回调
    on: function(event, data) {
        // 调用业务代码
        window.demo.on(event, data);
    }
};

// 以下是流程演示类
const mapUrl = {
    login: '/users/subaccount/login',
    logout: '/users/subaccount/logout'
};
window.demo = {
    userId: window.userId,
    password: window.password,
    token: '',
    ready: function(optionManager) {
        console.log('ready');
        this.optionManager = optionManager;
    },
    // 特殊跳转回调
    on: function(event, data) {
        if (event === 'login') {
            console.log('跳转登录');
        } else if (event === 'deposit') {
            console.log('跳转充值');
        } else if (event === 'allorder') {
            console.log('跳转完整交易记录');
        } else if (event === 'rich') {
            console.log('财富更新', data);
        } else if (event === 'trade' || event === 'tradeReq') {
            console.log('下单请求', data);
        } else if (event === 'tradeSucc') {
            console.log('下单成功', data);
        } else if (event === 'tradeUnsettled') {
            console.log('未结算订单', data);
        } else if (event === 'tradeSettled') {
            console.log('已结算订单', data);
        } else if (event === 'settle') {
            console.log('结算结果', data);
        }
    },
    // 查看配置
    getConfig: function() {
        console.log('getConfig', this.optionManager.getConfig());
    },
    // 切换语言
    setLanguege: function(name) {
        // LANGAUGE_ENGLISH - 英文
        // LANGAUGE_SIMPLE_CHINESE - 简体中文
        // LANGAUGE_KOREAN - 韩文
        this.optionManager.setLanguege(this.optionManager[name]);
    },
    // 提示消息
    message: function(content, type) {
        this.optionManager.message(content, type);
    },
    // 登录，自由发挥
    login: function() {
        return $.ajax(this.optionManager.getConfig().httpHost + mapUrl.login, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                apikey: 'fota',
                signature: 'fota-option-open-api' // 演示用签名
            },
            data: JSON.stringify({
                userId: this.userId,
                password: this.password
            }),
        }).then(function(res) {
            if (res.code === 0) {
                window.demo.token = res.data.token;
                console.log('getToken', window.demo.token);
                return window.demo.token;
            }
            return null;
        });
    },
    // 设置用户信息
    setUserInfo: function() {
        this.optionManager.setUserInfo({
            userId: this.userId,
            token: this.token
        });
        console.log('setUserInfo', this.userId, this.token);
    },
    // 清除缓存，退出登录
    clearCache: function() {
        this.optionManager.clearCache();
        // $.ajax(window.FOTA_OPTION_CONFIG.httpHost + mapUrl.loginout);
        // window.location.reload();
    }
};
