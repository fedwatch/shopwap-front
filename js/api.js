/**
 * Created by admin on 2017/3/12.
 */

/**
 * @module JS常用库配置
 */
seajs.config({
    alias:{
        "jquery":"/assets/plugin/jquery.min.js",
        "bankCheck":"/js/utils/bankCheck.js",
        "startScore":"/js/utils/startScore.js",
        "swiper":"/assets/plugin/idangerous.swiper.min.js",
        "light7":"/assets/plugin/light7/dist/js/light7.min.js",
        "light7-swiper":"/assets/plugin/light7/dist/js/light7-swiper.min.js",
        "light7-swipeout":"/assets/plugin/light7/dist/js/light7-swipeout.js",
        "fastclick":"//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js",
        "handlebars":"/assets/plugin/handlebars-v1.3.0",
        "mockjs":"http://mockjs.com/dist/mock.js",
        "touchSwipe":"/assets/plugin/jquery.touchSwipe.min.js",
        "store":"/js/utils/store.min.js",
        "weixin":"https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        "transDetails":"/js/utils/transDetails"
    },
    map: [
        // [/^.*$/, function(url) {
        //     return url += (url.indexOf('?') === -1 ? '?' : '&') +  versionNumber;
        // }]
    ],
    // debug:true
});


if(!seajs && !seajs.config){
    var RanNum = Date.now();
    var versionNumber="ts="+RanNum;
    console.log(versionNumber)
}



// console.log(versionNumber);


//
// seajs.config({
//     base:'//jp.juancdn.com/jpwebapp_v1/',
//     alias:{
//         'zepto':'js/lib/zepto.min',
//         'touch':'js/plugins/touch.min',
//         'underscore':'js/lib/underscore.min',
//         'iscroll':'js/plugins/iscroll',
//         'swipeSlide':'js/plugins/swipeSlide.min',
//         'handlebars':'js/plugins/handlebars',
//         'swiper':'js/plugins/swiper.min'
//     },
//
// });

// function use(pageName){
//     var basePath = seajs.data.base,
//         mode="build";
//     if(location.search.indexOf('debug=true')>-1){
//         mode='src';
//     }
//
//     // mode='src';
//
//     seajs.use('js/'+mode+'/'+pageName);
//
// }

