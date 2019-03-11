# option-sdkweb-demo v0.1.1.20190307
## 目录
- [一、集成SDK](#一集成sdk)
- [二、快速使用SDK](#二快速使用sdk)
- [三、接口说明](#三接口说明)
- [四、常见问题](#四常见问题)
- [五、更新记录](#五更新记录)
- [六、功能截图](#六功能截图)


## 一、集成SDK

### 兼容性

| 类别     | 兼容范围                      |
| -------- | ----------------------------- |
| 兼容性     | 主流浏览器       |

### 下载项目工程

### 1.1 项目结构

```
└── static - 静态资源文件夹
    ├── css - 样式
    ├── fonts - 字体图标
    ├── img - 图片
    └── js - 脚本
├── index.html - 入口页面
├── service-worker.js - 缓存索引
├── favicon.ico - 网站图标
└── demo.js - 演示代码
```

### 1.2 修改演示文件

需要修改的演示文件包括：
```
index.html - 增加业务相关的js文件引用，添加业务相关的html和css

demo.js - 修改SDK需要的实际配置，其他内容没有任何限制

favicon.ico - 替换为平台需要的图标
```


## 二、快速使用SDK

### 2.1 本地测试

打开index.html，页面会自动登录演示账号，后续可以进行各种操作。

如果接口提示验签失败，可能是测试账号的token过期了，需要重新调用login接口，获取token。


## 三、接口说明

### 3.1 初始配置和回调

```javascript
window.FOTA_OPTION_CONFIG = {
    isDevelopment: true,
    socketHost: 'wss://api-test.fota.com/mapi/websocket',
    httpHost: 'http://api-test.fota.com/mapi/v1',
    // 申请的平台id
    brokerId: 2,
    // SDK加载完成回调
    ready(optionManager) {
        // 调用业务代码
        // optionManager - 管理接口的对象
    },
    // 事件监听回调
    on(event, data) {
        // 调用业务代码
        // event - 事件
        // data - 数据
    }
};
```

### 3.2 设置开发模式

```javascript
/**
* is development environment
* 是否是开发环境
*/
isDevelopment: true

/**
* set the socketHost, only valid when development environment
* 配置socketHost 该配置只在开发模式下有效
*/
socketHost: ''

/**
* set the httpHost, only valid when development environment
* 配置httpHost 该配置只在开发模式下有效
*/
httpHost: ''
```

### 3.3 设置回调

```javascript
// SDK加载完成回调
ready(optionManager) {
    // optionManager - 管理接口的对象
    // 保证SDK加载完成后，再开始调用接口
},
// 事件监听回调
on(event, data) {
    // event - 事件
    // data - 数据
    // 包含'login'、'deposit'、'allorder'、'rich'、'trade'
    // 分别是，跳转登录、跳转充值、跳转完整交易记录、财富更新、下单请求
}
```

### 3.4 设置语言

```javascript
// LANGAUGE_ENGLISH - 英文
optionManager.setLanguege(optionManager.LANGAUGE_ENGLISH)
// LANGAUGE_SIMPLE_CHINESE - 简体中文
optionManager.setLanguege(optionManager.LANGAUGE_SIMPLE_CHINESE)
// LANGAUGE_KOREAN - 韩文
optionManager.setLanguege(optionManager.LANGAUGE_KOREAN)
```

### 3.5 设置登录token

```javascript
// 登录成功后设置userId和token
optionManager.setUserInfo({
    userId: 'userId',
    token: 'login token'
});
```

### 3.6 清除用户信息

```javascript
// 清理客户端缓存，退出登录
optionManager.clearCache()
```

### 3.7 查看参数配置
```javascript
optionManager.getConfig()
```


## 四、常见问题

#### 如何切换正式环境
- isDevelopment设为false，socketHost和httpHost无需修改

#### ready回调什么用
- ready回调执行后，才可以调用其他接口

#### on回调什么用
- on回调是对特殊事件的监听，如登录、充值等，跳转相应页面；或者下单、财富更新等，用于记录日志。

#### 用户登录是什么流程
- 用户登录平台方账号后，平台方调用我方服务端的/users/subaccount/login接口获取用户token，再调用我方SDK的optionManager.setUserInfo接口完成期权内登录

#### 用户退出是什么流程
- 调用我方SDK的optionManager.clearCache接口，清除客户端缓存，再调用我方服务端的/users/subaccount/logout接口清除服务端token

#### 一定要用demo.js和jQuery.js吗
- 不需要，这些js只是演示用的，实际代码完成业务流程即可，也没有任何框架限制


## 五、更新记录
以下是SDK更新记录

v0.1.1.20190307 监听事件回调的函数名改为on，增加财富更新、下单的回调通知

v0.1.0.20190306 标准版本，提供看行情、多账户下单等功能，ATM和OTM的玩法


## 六、功能截图
以下是SDK部分功能截图
