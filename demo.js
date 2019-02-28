/* demo 演示项目 */
// 当前版本 v0.1.0.20190228

const { $ } = window;

// 初始化参数
window.FOTA_OPTION_CONFIG = {
    isDevelopment: true,
    socketHost: '172.16.50.180:8088/mapi/option/websocket', // api-test.fota.com/mapi/option/websocket
    httpHost: '//172.16.50.203:8896/v1', // api-test.fota.com/mapi/v1
    // 申请的平台id
    brokerId: 119,
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
    userId: '2509065103023670272', // 测试账号
    password: '6sxsixuymb', // 测试密码
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
        const timestamp = Date.now();
        $.ajax(window.FOTA_OPTION_CONFIG.httpHost + mapUrl.login, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                apikey: 'fota',
                timestamp,
                signature: 'fota-option-open-api' // 测试签名
            },
            data: JSON.stringify({
                userId: this.userId,
                password: this.password
            }),
        }).then((res) => {
            if (res.code === 0) {
                this.token = res.data.token;
                console.log('getToken', this.token);
            }
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
