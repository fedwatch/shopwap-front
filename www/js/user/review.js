/**
 * Created by qs on 2017/4/11.
 */
define(function (require, exports, module) {
    require('jquery');
    require('startScore');

    $(function () {
        scoreFun($("#score"))
    });

    require.async('handlebars', function () {
        var data = [];
        var tpl = require('/zqVue/shopwap-front/www/layout/user/review.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(tpl);
        $("#review").html(html);
    });
})