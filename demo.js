/* demo 演示项目 */
// 当前版本 v0.1.0.20190306

const { $ } = window;

// 测试数据，如果执行了登录，需要把测试数据注释
window.localStorage.userId = window.userId || '2508713162866033664';
window.localStorage.sessionId = window.sessionId || 'ddc7c62d0229e9b62976d5b19b50d465';
window.localStorage.userAuth = window.userAuth || '{"registerAccount":""}';

// 初始化参数
window.FOTA_OPTION_CONFIG = window.FOTA_OPTION_CONFIG || {
    isDevelopment: true,
    socketHost: 'wss://api-test.fota.com/mapi/websocket',
    httpHost: 'https://api-test.fota.com/mapi/v1',
    // 申请的平台id
    brokerId: 2,
    // SDK加载完成回调
    ready(optionManager) {
        // 调用业务代码
        window.demo.ready(optionManager);
    },
    // 特殊跳转回调
    goto(page) {
        // 调用业务代码
        window.demo.goto(page);
    }
};

// 以下是流程演示类
const mapUrl = {
    login: '/users/subaccount/login',
    logout: '/users/subaccount/logout'
};
window.demo = {
    userId: window.userId || '2508713162866033664', // 测试账号
    password: window.password || '8ri4hittxn', // 测试密码
    token: '',
    ready(optionManager) {
        console.log('ready');
        this.optionManager = optionManager;
    },
    // 特殊跳转回调
    goto(page) {
        if (page === 'login') {
            console.log('跳转登录');
        } else if (page === 'deposit') {
            console.log('跳转充值');
        } else if (page === 'allorder') {
            console.log('跳转完整交易记录');
        }
    },
    // 查看配置
    getConfig() {
        console.log('getConfig', this.optionManager.getConfig());
    },
    // 切换语言
    setLanguege(name) {
        // LANGAUGE_ENGLISH - 英文
        // LANGAUGE_SIMPLE_CHINESE - 简体中文
        // LANGAUGE_KOREAN - 韩文
        this.optionManager.setLanguege(this.optionManager[name]);
    },
    // 登录，自由发挥
    login() {
        return $.ajax(window.FOTA_OPTION_CONFIG.httpHost + mapUrl.login, {
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
        }).then((res) => {
            if (res.code === 0) {
                this.token = res.data.token;
                console.log('getToken', this.token);
                return this.token;
            }
            return null;
        });
    },
    // 设置用户信息
    setUserInfo() {
        this.optionManager.setUserInfo({
            userId: this.userId,
            token: this.token
        });
        console.log('setUserInfo', this.userId, this.token);
    },
    // 清除缓存，退出登录
    clearCache() {
        this.optionManager.clearCache();
        // $.ajax(window.FOTA_OPTION_CONFIG.httpHost + mapUrl.loginout);
        // window.location.reload();
    }
};
