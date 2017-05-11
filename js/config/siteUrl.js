/**
 * Created by Administrator on 2017/3/10.
 */
//基本URL
var BASE_URL = "//localhost/shopwap";

//商品信息
var PRODUCT_SITE_URLS = {
    //数据接收类型
    DATATYPE:"json",
    //计算运费
    CALCULATE_FREIGHT:{URL:"/product/calculateFreight",METHOD:"GET"},
    //查询商品详情
    PRODUCT_VIEW:{URL:"/product/view",METHOD:"GET"},
    //一级菜单查询
    FIND_ROOTS:{URL:"/product_category/findRoots",METHOD:"GET"},
    //子级菜单查询
    FIND_SUBS:{URL:"/product_category/findSubs",METHOD:"GET"},
    //商品查询
    PRODUCT_SEARCH: {URL:"/product/search",METHOD:"GET"}
};

//物流信息
var LOGISTICS_URLS = {
    //数据接收类型
    DATATYPE:"json",
    //物流信息查询
    PRODUCT_SEARCH: {URL:"/member/order/logistics",METHOD:"GET"}
};

//购物车
var CART_SITE_URL = {
    DATATYPE:"json",
    // 购物车添加
    CART_ADD:{URL:"/cart/add",METHOD:"POST"},
    // 购物车商品数量
    CART_COUNT:{URL:"/cart/cartCount",METHOD:"GET"},
    // 购物车清空
    CART_CLEAR:{URL:"/cart/clear",METHOD:"POST"},
    // 购物车删除
    CART_DELETE:{URL:"/cart/delete",METHOD:"POST"},
    // 购物车编辑
    CART_EDIT:{URL:"/cart/edit",METHOD:"POST"},
    // 购物车查看
    CART_LIST:{URL:"/cart/list",METHOD:"GET"},
};

// 支付信息
var PAYMENT_SITE_URL = {

    //输入银行卡号获取银行卡信息
    BANKCARD_BIND:{URL:"/member/bank/bankcardbin",METHOD:"POST"},
    //绑定银行卡并支付
    BOUND_CARD_PAY:{URL:"/member/payment/boundCardPay",METHOD:"GET"},
    //快捷支付
    PAY_SUBMIT:{URL:"/member/payment/paySubmit",METHOD:"POST"},
};

// 订单信息
var ORDER_SITE_URL = {
    DATATYPE:"json",
    // 计算应付金额
    CALCULATE:{URL:"/member/order/calculate",METHOD:"POST"},
    // 订单取消
    CANCEL:{URL:"/member/order/cancel",METHOD:"POST"},
    // 订单完成
    COMPLETE:{URL:"/member/order/complete",METHOD:"POST"},
    // 创建订单
    CREATE:{URL:"/member/order/create",METHOD:"POST"},
    // 删除订单
    DELETE_ORDER:{URL:"/member/order/deleteOrder",METHOD:"POST"},
    // 生成预订单
    INFO:{URL:"/member/order/info",METHOD:"POST"},
    // 订单列表
    LIST:{URL:"/member/order/list",METHOD:"GET"},
    // 查看物流
    LOGISTICS:{URL:"/member/order/logistics",METHOD:"GET"},
    // 查看订单
    VIEW:{URL:"/member/order/view",METHOD:"GET"},
};


