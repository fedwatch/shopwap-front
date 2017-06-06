define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('light7-swiper');
    require('light7-swipeout');
    require('siteUrl');
    require('store');

    jQuery.support.cors = true;
    $(function () {
        var sn = store.get("sn");
        var username = store.get("username");
        $.ajax({
            url: BASE_URL + LOGISTICS_URLS.PRODUCT_SEARCH.URL,
            dataType: LOGISTICS_URLS.DATATYPE,
            type: LOGISTICS_URLS.PRODUCT_SEARCH.METHOD,
            data: {username: username, sn: sn},
            success: function (result) {
                if (result.authStatus == "200") {
                    console.log(result);
                    require.async('handlebars', function () {
                        var getData = result;
                        var tpl = require('/zqVue/shopwap-front/www/layout/user/logistics.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(getData);
                        $("#logistics").html(html);
                        $.init();

                        $("#J_listtext2 li").eq(0).addClass("latest");
                    });
                }
            }
        })
    });


})