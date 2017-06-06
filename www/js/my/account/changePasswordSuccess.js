/**
 * Created by Administrator on 2017/5/20.
 */
define(function (require, exports, module) {
    require('jquery');
    require("light7");
    // require("varietyValidation");
    require("store");
    require("siteUrl");

    jQuery.support.cors = true;
    $(function () {

    });


    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/zqVue/shopwap-front/www/layout/my/account/changePasswordSuccess.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordSuccess").html(html);
    });
});
