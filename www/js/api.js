/**
 * Created by admin on 2017/3/12.
 */

/**
 * @module JS常用库配置
 */

var M_URL = '/m';
seajs.config({
    alias: {
        //通用库
        "jquery": M_URL + "/assets/plugin/jquery.min.js",
        // "jquery":M_URL+"/assets/plugin/2jquery.min",
        // "jquery":"https://cdn.bootcss.com/jquery/1.8.0/jquery.min.js",
        "iscroll": M_URL + "/js/utils/iscroll.js",
        "iscrollProbe": M_URL + "/js/utils/iscroll-probe.js",
        "page": M_URL + "/js/utils/page.js",
        // "iscrollProbe":M_URL+"/js/utils/iscroll-probe.js",
        "pageScroll": M_URL + "/js/utils/pageScroll.js",
        "bankCheck": M_URL + "/js/utils/bankCheck.js",
        "divideAmount": M_URL + "/js/utils/divideAmount.js",
        "startScore": M_URL + "/js/utils/startScore.js",
        "swiper": M_URL + "/assets/plugin/idangerous.swiper.min.js",
        "light7": M_URL + "/assets/plugin/light7/dist/js/light7.min.js",
        "light7-swiper": M_URL + "/assets/plugin/light7/dist/js/light7-swiper.min.js",
        "light7-swipeout": M_URL + "/assets/plugin/light7/dist/js/light7-swipeout.js",
        "city-picker": M_URL + "/assets/plugin/light7/dist/js/light7-city-picker.js",
        "fastclick": "//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js",
        "handlebars": M_URL + "/assets/plugin/handlebars-v1.3.0",
        "mockjs": M_URL + "/assets/plugin/mockjs",
        "extJquery": M_URL + "/assets/plugin/extJquery",

        "touchSwipe": M_URL + "/assets/plugin/jquery.touchSwipe.min",
        "store": M_URL + "/js/utils/store.min",
        "session": M_URL + "/js/utils/session.js/dist/session",
        "weixin": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        "transDetails": M_URL + "/js/utils/transDetails",
        "parseUrl": M_URL + "/js/utils/parseUrl",
        "transCommonPay": M_URL + "/js/utils/transCommonPay",
        "transMyOrder": M_URL + "/js/utils/transMyOrder",
        "hbCompare": M_URL + "/js/utils/hbCompare",
        "varietyValidation": M_URL + "/js/utils/varietyValidation.js",

        "lazyload": M_URL + "/js/utils/lazyload.min",
        "jLazyload": M_URL + "/js/utils/jquery.lazyload.min",

        "rsa": M_URL + "/js/utils/rsa/rsa.js",
        "base64": M_URL + "/js/utils/rsa/base64.js",
        "rng": M_URL + "/js/utils/rsa/rng.js",
        "jsbn": M_URL + "/js/utils/rsa/jsbn.js",
        "prng4": M_URL + "/js/utils/rsa/prng4.js",
        "rsa-all": M_URL + "/js/utils/rsa/rsa-all.js",
        "jsonp": M_URL + "/js/utils/jquery.jsonp.js",
        "zepto": "https://cdn.bootcss.com/zepto/1.2.0/zepto.min.js",
        "swipeout": M_URL + "/assets/plugin/light7/dist/js/light7-swipeout.js",
        "siteUrl": M_URL + "/js/config/siteUrl.js",
        "user": M_URL + "/js/config/user.js",
        "setUser": M_URL + "/js/config/setUser.js",
        "getUser": M_URL + "/js/config/getUser.js",
        "city-swiper": M_URL + "/assets/plugin/light7/dist/js/light7-city-picker.js",
        "getCurrentPage": M_URL + "/js/utils/getCurrentPage"
    }
});


