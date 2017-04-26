/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require("swiper");
    require("mockjs");
    require("/js/utils/getCurrentPage");
    var fastclick = require("fastclick");

    // fastclick.attach(document)



    $(function () {
        Mock.mock(/\/initShopData$/, {
            'images': [
                {"url": "../assets/images/shop1-index.png","alt":"AD"},
                {"url": "../assets/images/shop2-index.png","alt":"AD"},
                {"url": "../assets/images/shop3-index.png","alt":"AD"},
                {"url": "../assets/images/shop4-index.png","alt":"AD"},
                {"url": "../assets/images/shop1-index.png","alt":"AD"},
                {"url": "../assets/images/shop2-index.png","alt":"AD"},
                {"url": "../assets/images/shop3-index.png","alt":"AD"},
                {"url": "../assets/images/shop4-index.png","alt":"AD"},
                {"url": "../assets/images/shop1-index.png","alt":"AD"},
                {"url": "../assets/images/shop2-index.png","alt":"AD"},
                {"url": "../assets/images/shop3-index.png","alt":"AD"},
                {"url": "../assets/images/shop4-index.png","alt":"AD"},
            ]
        });

        initShopData();
        getCurrentPage();

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

    function initShopData(){
        $.ajax({
            url:"/initShopData",
            dataType:"json",
            type:"post",
            data:{},
            success:function (data) {
                // productSlider
                require.async('handlebars',function(){
                    var getData = data;
                    var tpl =  require('/layout/index/category.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(getData);
                    $("#category").html(html);
                });
            }
        })
    }
    



    // banner
    require.async('handlebars',function(){
        var data = {
            data:'499',
            img: ["../assets/images/banner1.png", "../assets/images/banner2.png", "../assets/images/banner3.png"]
        };
        var tpl = require('/layout/index/banner.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#banner").html(html);
        // $("#navbarSearch").html(tpl);
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
