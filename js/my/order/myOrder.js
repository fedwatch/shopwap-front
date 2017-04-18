/**
 * 我的订单
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('light7');
    require('mockjs');

    $(function () {

    });

    // modifySuccess
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/my/myOrder.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#myOrderPage").html(html);
    });



});
