/**
 * Created by Administrator on 2017/3/10.
 */
//基本URL
var BASE_URL = "//localhost/shopwap";

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

var LOGISTICS_URLS = {
    //数据接收类型
    DATATYPE:"json",
    //物流信息查询
    PRODUCT_SEARCH: {URL:"/member/order/logistics",METHOD:"GET"}
};

var CART={
    //数据接收类型
    DATATYPE:"json",
    //
    CALCULATE_FREIGHT:{URL:"/product/calculateFreight",METHOD:"GET"},
    //查询商品详情
    PRODUCT_VIEW:{URL:"/product/view",METHOD:"GET"},
    //一级菜单查询
    FIND_ROOTS:{URL:"/product_category/findRoots",METHOD:"GET"},
    //子级菜单查询
    FIND_SUBS:{URL:"/product_category/findSubs",METHOD:"GET"},
    //商品查询
    PRODUCT_SEARCH: {URL:"/product/search",METHOD:"GET"}
}
