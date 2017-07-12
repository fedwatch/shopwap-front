/**
 * Created by Administrator on 2017/3/10.
 * @module
 *
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');


    $(function () {

    });

    // modifySuccess
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/zqVue/shopwap-front/www/layout/my/forgetPassword/modifySuccess.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#modifySuccessPage").html(html);
    });


});
