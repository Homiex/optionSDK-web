# option-sdkweb-demo v0.6.0.20190709
## 目录
- [一、集成SDK](#一集成sdk)
- [二、快速使用SDK](#二快速使用sdk)
- [三、接口说明](#三接口说明)
- [四、常见问题](#四常见问题)
- [五、更新记录](#五更新记录)
- [六、功能预览](#六功能预览)


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
├── service-worker.js - sw入口文件
├── precache-manifest.js - 文件缓存索引
├── workbox-v4.3.1 - sw缓存依赖
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

如果接口提示验签失败，可能是测试账号的token过期了

调用login接口可以获取token，但不要每次进页面都获取，否则用户会被频繁退出，只需在token失效后调用。

brokerId、appkey、signature是有绑定关系的，需要在js文件中使用申请的券商参数进行配置。


## 三、接口说明

### 3.1 初始配置和回调

```javascript
window.FOTA_OPTION_CONFIG = {
    isDevelopment: true,
    socketHost: 'wss://api-test.fota.com/mapi/websocket',
    httpHost: 'http://api-test.fota.com/mapi/v1',
    // 申请的平台id字符串
    brokerId: 'test',
    // 排行榜开关
    showRank: true,
    // 教学视频开关
    showVideo: true,
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
    // 包含'login'、'deposit'、'allorder'、'rich'、'trade'、'tradeSucc'、'settle'、'lang'
    // 分别是，跳转登录、跳转充值、跳转完整交易记录、财富更新、下单请求、下单成功、结算记录、'语言切换'
}
```

### 3.4 设置语言

```javascript
// LANGAUGE_ENGLISH - 英语
optionManager.setLanguege(optionManager.LANGAUGE_ENGLISH)
// LANGAUGE_SIMPLE_CHINESE - 简体中文
optionManager.setLanguege(optionManager.LANGAUGE_SIMPLE_CHINESE)
// LANGAUGE_KOREAN - 韩语
optionManager.setLanguege(optionManager.LANGAUGE_KOREAN)
// LANGAUGE_VIETNAM - 越南语
optionManager.setLanguege(optionManager.LANGAUGE_VIETNAM)
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
- isDevelopment设为false，socketHost和httpHost无需修改。

#### ready回调什么用
- ready回调执行后，才可以调用其他功能接口。

#### on回调什么用
- on回调是对特殊事件的监听，如登录、充值等，跳转相应页面；或者下单、财富更新等，用于记录日志。

#### 用户登录是什么流程
- 用户登录平台方账号后，平台方调用我方服务端的/users/subaccount/login接口获取用户token，再调用我方SDK的optionManager.setUserInfo接口完成期权内登录。

#### 用户退出是什么流程
- 调用我方SDK的optionManager.clearCache接口，清除客户端缓存，再调用我方服务端的/users/subaccount/logout接口清除服务端token。

#### 一定要用demo.js和jQuery.js吗
- 不需要，这些js只是演示用的，实际代码完成业务流程即可，也没有任何框架限制。

#### 如何增加自定义的UI代码
- 可以在原有html页面上添加任意html+css+js的代码。

#### 静态资源如图片或者字体提示404错误
- 静态资源打包时，在路径里包含了static，建议保留文件夹命名。如果要修改文件夹名，请同步调整css和js文件内的路径变量。

#### 升级后的sw打包机制，有什么变化
- 目前使用workbox插件管理sw，打包后的目录里会增加workbox-v4的文件夹。

#### 如何隐藏排行榜
- 设置showRank为false。

#### 如何隐藏教学视频
- 设置showVideo为false。

#### 如何配置Gamma期权的上线和下线
- 和商务沟通，由技术在内部的管理后台操作。

#### 如何实现灵活上币
- iconfont文件目前以固定地址引入，地址可加时间戳。配置后台添加新币种后，线上文件内容会更新，达到灵活上币的效果。

#### 人机验证码有什么用，如何接入
- 通过人机验证码，限制用户过于频繁的下单
- 接入改动，加上：`<script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>`
- 其他代码不需要改动


## 五、更新记录
以下是SDK更新记录

v0.7.0.20190715 增加下单过于频繁的人机验证码

v0.6.0.20190709 增加Gamma期权的玩法，增加教学视频

v0.5.0.20190520 增加灵活上币，优化排行榜

v0.4.5.20190430 增加更多时间维度，增加连续缩放

v0.4.4.20190423 升级sw的打包机制

v0.4.3.20190412 增加排行榜和昵称的开关配置，增加语言切换回调

v0.4.2.20190411 增加排行榜，增加昵称的设置弹窗

v0.3.5.20190328 优化侧边栏，优化全局样式，优化性能，更新本地缓存key名避免和三方冲突

v0.3.4.20190326 更新结算点UI，优化性能，增加下单成功的回调

v0.3.0.20190322 增加左侧边栏UI，增加音效，优化性能，增加结算的回调

v0.2.0.20190307 监听事件回调的函数名改为on，增加财富更新、下单的回调通知

v0.1.0.20190306 标准版本，提供看行情、多账户下单等功能，ATM和OTM的玩法


## 六、功能预览
SDK功能预览，直接运行index.html即可
