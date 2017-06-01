/**
 * Created by Administrator on 2017/3/10.
 */
//基本URL
var BASE_URL = "//"+location.host+"/wap";
// var BASE_URL = "//192.168.3.70:8888/wap";

var CONFIG_CATEGORY_MAIN_ID = "105";
var CONFIG_CATEGORY_SECOND_ID = "112";
var M_URL  = '/m';
// 用户信息
var USER_SITE_URL = {
    //数据接收类型
    DATATYPE: "json",
    // 获取公钥
    PUBLIC_KEY: {URL: "/common/public_key", METHOD: "GET"},
    // 用户注册
    USER_REGISTER: {URL: "/user/userRegister", METHOD: "POST"},
    // 用户登录系统
    USER_LOGIN: {URL: "/user/userLogin", METHOD: "POST"},
    // 用户登出系统
    USER_LOGOUT: {URL: "/user/logout", METHOD: "POST"},
    // 发送手机验证码
    SEND_DYNAMIC_CODE: {URL: "/user/sendDynamicCode", METHOD: "POST"},
    // 找回密码提交
    FIND_PASSWORD: {URL: "/user/findPassword", METHOD: "POST"},
    // 用户重置密码
    RESET_PASSWORD: {URL: "/user/resetPassword", METHOD: "POST"},
    // 会员密码更新
    UPDATE_PASSWORD: {URL: "/user/updatePassword", METHOD: "POST"},
};


var INIT_SITE_URL = {
    DATATYPE: "json",
    banner: {URL: "/init/banner", METHOD: "GET"}
};

//物流信息
var LOGISTICS_URLS = {
    //数据接收类型
    DATATYPE: "json",
    //物流信息查询
    PRODUCT_SEARCH: {URL: "/member/order/logistics", METHOD: "GET"}
};

//购物车
var CART_SITE_URL = {
    DATATYPE: "json",
    // 购物车添加
    CART_ADD: {URL: "/cart/add", METHOD: "POST"},
    // 购物车商品数量
    CART_COUNT: {URL: "/cart/cartCount", METHOD: "GET"},
    // 购物车清空
    CART_CLEAR: {URL: "/cart/clear", METHOD: "POST"},
    // 购物车删除
    CART_DELETE: {URL: "/cart/delete", METHOD: "POST"},
    // 购物车编辑
    CART_EDIT: {URL: "/cart/edit", METHOD: "POST"},
    // 购物车查看
    CART_LIST: {URL: "/cart/list", METHOD: "GET"},
};

// 支付信息
var PAYMENT_SITE_URL = {
    DATATYPE: "json",
    //输入银行卡号获取银行卡信息
    BANKCARD_BIND: {URL: "/member/bank/bankcardbin", METHOD: "POST"},
    //绑定银行卡并支付
    BOUND_CARD_PAY: {URL: "/member/payment/boundCardPay", METHOD: "POST"},
    // 银行卡列表
    BANK_LIST: {URL: "/member/payment/bankList", METHOD: "POST"},
    //快捷支付
    PAY_SUBMIT: {URL: "/member/payment/paySubmit", METHOD: "POST"},
};

// 订单信息
var ORDER_SITE_URL = {
    DATATYPE: "json",
    // 计算应付金额
    CALCULATE: {URL: "/member/order/calculate", METHOD: "POST"},
    // 订单取消
    CANCEL: {URL: "/member/order/cancel", METHOD: "POST"},
    // 订单完成
    COMPLETE: {URL: "/member/order/complete", METHOD: "POST"},
    // 创建订单
    CREATE: {URL: "/member/order/create", METHOD: "POST"},
    // 删除订单
    DELETE_ORDER: {URL: "/member/order/deleteOrder", METHOD: "POST"},
    // 生成预订单
    INFO: {URL: "/member/order/info", METHOD: "POST"},
    // 订单列表
    LIST: {URL: "/member/order/list", METHOD: "GET"},
    // 查看物流
    LOGISTICS: {URL: "/member/order/logistics", METHOD: "GET"},
    // 查看订单
    VIEW: {URL: "/member/order/view", METHOD: "GET"},
    //创建并合并支付
    CREATE_PAYMENT:{URL:"/member/order/createPayment",METHOD:"POST"},
    //支付界面，合并支付
    PAY_MENT:{URL:"/member/order/payment",METHOD:"GET"},
    //订单锁定检查
    CHECK_LOCK:{URL:"/member/order/checkLock",METHOD:"POST"},
    //计算订单支付金额
    CALCULATE_AMOUNT:{URL:"/member/order/calculateAmount",METHOD:"POST"},
    // 支付手动解锁订单
    UNLOCK:{URL:"/member/order/unlock",METHOD:"POST"},
    // 检查支付是否完成,根据支付订单检查
    CHECK_PAYMENT:{URL:"/member/order/checkPayment",METHOD:"POST"},
    // 支付结果订单信息
    PAYMENT_VIEW:{URL:"/member/order/paymentView",METHOD:"GET"},
};

// 会员信息
var MEMBER_SITE_URL = {
    DATATYPE: "json",
    // 保存收货地址
    SAVE_RECEIVER: {URL: "/member/order/save_receiver", METHOD: "POST"},
    // 收货地址删除
    DELETE: {URL: "/member/receiver/delete", METHOD: "POST"},
    // 收货地址列表查看
    LIST: {URL: "/member/receiver/list", METHOD: "GET"},
    // 添加新的收货地址
    SAVE: {URL: "/member/receiver/save", METHOD: "POST"},
    // 收货地址列表更新
    UPDATE: {URL: "/member/receiver/update", METHOD: "POST"},
    // 收货地址查看
    VIEW: {URL: "/member/receiver/view", METHOD: "POST"},
    // 会员首页
    INDEX: {URL: "/member/index", METHOD: "GET"},
};

// 商品信息
var PRODUCT_SITE_URLS = {
    // 数据接收类型
    DATATYPE: "json",
    // 计算运费
    CALCULATE_FREIGHT: {URL: "/product/calculateFreight", METHOD: "GET"},
    // 查询商品详情
    PRODUCT_VIEW: {URL: "/product/view", METHOD: "GET"},
    // 一级菜单查询
    FIND_ROOTS: {URL: "/product_category/findRoots", METHOD: "GET"},
    // 根据ip查询所在地
    FIND_AREA_BY_IP: {URL: "/product/findAreaByIp", METHOD: "GET"},
    // 子级菜单查询
    FIND_SUBS: {URL: "/product_category/findSubs", METHOD: "GET"},
    // 商品查询
    PRODUCT_SEARCH: {URL: "/product/search", METHOD: "GET"},
    // 商品评价查看
    PRODUCT_COMMENT: {URL: "/review/content/view", METHOD: "GET"},
    // 查询地区
    FIND_AREA_LIST: {URL: "/product/findAreaList", METHOD: "GET"}
};


var COMMON_SITE_URL = {
    //数据接收类型
    DATATYPE: "json",
    // 查询所有区域
    FIND_AREA_LIST: {URL: "/common/jsonPort", METHOD: "GET"},
    //商品查询
    SEARCH: {URL: "/product/search", METHOD: "GET"}
};



