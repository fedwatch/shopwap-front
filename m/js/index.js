/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require("swiper");
    // require("lazyload");
    require("light7");
    // require("mockjs");
    require("getCurrentPage");
    require("store");
    require("siteUrl");

    jQuery.support.cors = true;
    var MD_URL = '//'+location.host+'/m';
    $(function () {

        // $("img.lazy").lazyload({
        //     threshold : 0,
        //     effect : "show",
        //     failure_limit: 10,
        //     event: "scroll",
        //     no_fake_img_loader:true
        // });
        getCurrentPage();

        findAreaByIp();

        var bannerSwiper = new Swiper('.swiper-banner', {
            pagination: '.pagination',
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            speed: 600
        });


        $(document).on("click",".bt-img a",function () {
            var $this = $(this);
            var id = $this.data("id");
            store.set("currentProductID",id);
            return location.href = MD_URL+"/html/detail/detail.html";
        })

    });



    function findAreaByIp(){
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.FIND_AREA_BY_IP.URL,
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            type:PRODUCT_SITE_URLS.FIND_AREA_BY_IP.METHOD,
            success:function (data) {
                if(data.authStatus == '200'){
                    store.set("areaId",data.area.id);
                }else{
                    console.log(data.authMsg);
                    console.log(data.authStatus);
                }
            }
        });
    }


    require.async('handlebars',function(){
        var getData = {};
        var tpl =  require('/m/layout/index/category.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(getData);
        $("#category").html(html);
    });

    // banner
    require.async('handlebars',function(){
        var data = {
            banner: [
                {url:"//jie.net/static/dragonboat0522/wap/dragonboat.html",image:"../assets/images/banner-1.jpg"},
            ],
        };
        var tpl = require('/m/layout/index/banner.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#banner").html(html);
    });

    // navbarSearch
    require.async('handlebars',function(){
        var data = {
            data:'搜索'
        };
        var tpl = require('/m/layout/index/navbarSearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#navbarSearch").html(html);
    });

    // footerNav
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/m/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footerNavPage").html(html);
    });

});
