# option-sdkweb-demo
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

#### 1.1 项目目录

static - 静态资源文件夹，包含css、js、图片、字体

index.html - 主页文件

service-worker.js - 缓存文件

favicon.ico - 网站图标

demo.js - 测试文件，可以替换为任何文件


## 二、快速使用SDK

### 2.1 修改测试文件

需要修改的文件包括：

index.html - 增加业务相关的js文件引用，添加业务相关的html和css

demo.js - 增加SDK需要的配置参数，文件名没有限制

favicon.ico - 替换为平台需要的图标


## 三、接口说明

### 3.1 初始配置和回调

```javascript
window.FOTA_OPTION_CONFIG = {
    isDevelopment: true,
    socketHost: 'api-test.fota.com/mapi/option/websocket',
    httpHost: '//api-test.fota.com/mapi/v1',
    // 申请的平台id
    brokerId: 119,
    // SDK加载完成回调
    ready(optionManager) {
        // 调用业务代码
        // optionManager - 管理接口的对象
    },
    // 特殊跳转回调
    goto(page) {
        // 调用业务代码
        // page - 跳转路由
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
// 特殊跳转回调
goto(page) {
    // page - 跳转路由
    // 包含'login'、'deposit'、'allorder'几种情况
    // 分别是，跳转登录，跳转充值，跳转完整交易记录
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
// 清理数据相当于退出登录，刷新后生效
optionManager.clearCache()
```

### 3.7 查看参数配置
```javascript
optionManager.getConfig()
```


## 四、常见问题

### 如何切换正式环境
- isDevelopment设为true，socketHost和httpHost无需修改

### ready回调什么用
- ready回调执行后，可以调用其他接口

### goto回调什么用
- 可以响应用户操作，如登录、充值等，跳转相应页面

### 用户登录是什么流程
- 用户登录平台账号后，通过/users/subaccount/login的服务端接口获取用户token，再调用optionManager.setUserInfo的SDK接口完成期权内登录

### 用户退出是什么流程
- 调用optionManager.clearCache的SDK接口，清除客户端缓存，再调用/users/subaccount/logout服务端接口清除服务端token

### 是不是一定要有demo.js或jQuery.js
- 这些文件只是演示用的代码，实际代码只需完成业务流程即可，没有任何框架限制


## 五、更新记录
以下是SDK更新记录

v0.1.0.20190228 提供基础功能，包含看行情和下单


## 六、功能截图
以下是SDK部分功能截图
