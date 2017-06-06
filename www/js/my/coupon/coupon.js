define(function (require, exports, module) {
    require('jquery');
    require('mockjs');

    var data = Mock.mock("/getData", {
        "title": {
            "title1": "未使用",
            "title2": "已使用",
            "title3": "过期"
        },
        "context": {
            "date": {
                "id1": "2017-12-20到2017-12-31",
                "id2": "2017-12-20到2017-12-31",
                "id3": "2017-12-20到2017-12-31"
            },
            "text": {
                "text1": "满200立减100",
                "text2": "满200立减1000",
                "text3": "满300立减3000"
            }
        }
    });


    require.async('handlebars', function () {
        $.ajax({
            url: "/getData",
            dataType: "json",
            type: "get",
            cache:true,
            async:false,
            success: function (data) {
                var tpl = require('/zqVue/shopwap-front/www/layout/my/coupon.tpl');
                var template = Handlebars.compile(tpl);
                var html = template(data);
                $("#couponPage").html(html);
            }
        })
    });
});