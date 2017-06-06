define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('store');
    require('siteUrl');

    jQuery.support.cors = true;
    $(function () {


    });

    require.async('handlebars', function () {
        $.ajax({
            url: BASE_URL + PRODUCT_SITE_URLS.PRODUCT_COMMENT.URL,
            type: PRODUCT_SITE_URLS.PRODUCT_COMMENT.METHOD,
            data: {username: "13167161025", id: '308', pageNumber: "1", pageSize: "10"},
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (data) {
                if (data.authStatus == "200") {
                    var tpl = require('/zqVue/shopwap-front/www/layout/user/comment.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#comment").html(html);
                    //星星评分
                    totalStar(data.score);
                    $.init();
                }
            }
        })
    });


    //星星评分显示
    function totalStar(num) {
        var eachStarLen = $(".comment-header").find("li").outerWidth();
        var ceilNum = Math.ceil(num);
        var intNum = parseInt(num);
        var remainder = num - intNum;
        var html = '<div class="eval-con"><span  class="eval-offset"></span></div>';
        $(".evaluate").each(function (index, item) {
            for (var i = 0; i <= intNum - 1; i++) {
                if (index == i) {
                    $(this).html(html);
                }
            }
        });
        if (remainder != 0) {
            $(".evaluate").eq(ceilNum - 1).html(html);
            var realWidth = eachStarLen * remainder + "px";
            $(".eval-con").eq(ceilNum - 1).css({width: realWidth});
        }
    }

})