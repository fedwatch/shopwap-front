/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require("swiper");
    require("light7");
    // require("mockjs");
    require("/js/utils/getCurrentPage");
    require("store");
    require("siteUrl");




    // var fastclick = require("fastclick");
    // fastclick.attach(document)
    jQuery.support.cors = true;
    $(function () {
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
    });



    function findAreaByIp(){
        // /product/findAreaByIp
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.FIND_AREA_BY_IP.URL,
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            type:PRODUCT_SITE_URLS.FIND_AREA_BY_IP.METHOD,
            success:function (data) {
                if(data.authStatus == '200'){
                    store.set("areaId",data.area.id);
                }else{
                    $.toast(data.authMsg)
                }
            }
        });
    }


    require.async('handlebars',function(){
        var getData = {};
        var tpl =  require('/layout/index/category.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(getData);
        $("#category").html(html);
    });

    // banner
    require.async('handlebars',function(){
        var data = {
            data:'499',
            img: [
                "../assets/images/banner1.png",
                "../assets/images/banner2.png",
                "../assets/images/banner3.png"
            ]
        };
        var tpl = require('/layout/index/banner.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#banner").html(html);
    });

    // navbarSearch
    require.async('handlebars',function(){
        var data = {
            data:'男装春上新'
        };
        var tpl = require('/layout/index/navbarSearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#navbarSearch").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // footerNav
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footerNavPage").html(html);
    });


})
