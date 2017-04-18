/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require,exports,module) {
    require('jquery');

    $(function () {
        var menuwidth = 250;
        var menuspeed = 300;
        var $body = $('body');
        var $burger = $('#hamburgermenu');
        var $menubtn = $('.menubtn');
        $menubtn.on("touchend", function (e) {
            e.stopPropagation();
        });
        $menubtn.on('click', function (e) {
            $('html,body').addClass('ovfHiden');
            var wap_height = document.documentElement.clientHeight;
            var hidden_height = $('#sxContent').height() + 80 - wap_height;
            var visible_height = $('#sxContent').height() - hidden_height;
            document.getElementById("sxContent").style.height = visible_height + "px";
            $('#sxContent').css("overflow-y", "auto");
            if ($body.hasClass('openmenu')) {
                animateMenu('close');
            } else {
                animateMenu('open');
            }
        });
        $('#sxContent a').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        })
        $('.menuSmall').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).siblings('ul').slideDown();
            } else {
                $(this).siblings('ul').slideUp();
            }
        });
        $('.overlay').on('click', function (e) {
            if ($body.hasClass('openmenu')) {
                animateMenu('close');
                $('html,body').removeClass('ovfHiden');
            }
        });

        function animateMenu(tog) {
            if (tog == 'open') {
                $body.addClass('openmenu');
                $burger.animate({width: "230px"}, menuspeed);
                $('.overlay').animate({left: 0}, menuspeed);
            }
            if (tog == 'close') {
                $body.removeClass('openmenu');
                $burger.animate({width: "0"}, menuspeed);
                $('.overlay').animate({right: "0"}, menuspeed);
            }
        }
    });


    function GetSlideDirection(startX, startY, endX, endY) {
        var dy = startY - endY;
        var result = 0;
        if (dy > 0) {
            return result = 1;
        } else {
            return result = 2;
        }
    }
    var startX, startY;
    document.addEventListener('touchstart', function (ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function (ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        var shopListSort = document.getElementById('shopListSort');
        var shopTop = document.getElementById('shopTop');
        switch (direction) {
            case 0:
                break;
            case 1:
                shopTop.className = "";
                shopTop.style.height = "40px"
                shopListSort.style.position = "fixed";
                shopListSort.style.top = "0px";
                break;
            case 2:
                shopTop.className = "shopSort";
                shopListSort.style.position = "static";
                break;
            default:
        }
    }, false);


    // shopListShowIndex
    require.async('handlebars',function(){
        var data = {
            name:'KAMJOVE/金灶 K7智能电茶壶自动上水 304不锈钢烧水壶 电热水壶',
            brandName:'KAMJOVE',
            productName:'金灶',
            productCategory:'K7',
            feature:'智能电茶壶自动上水',
            keyword1:'304不锈钢烧水壶',
            keyword2:'电热水壶',
            keyword3:'不锈钢烧水壶',
            price:'200',
            decimalPrice:'30',
            purchasePeoples:'35837'
        };
        var tpl = require('/layout/shopList/shopListShowIndex.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#shopListShowIndex").html(html);
        // $("#navbarSearch").html(tpl);
    });


    // shopListSort
    require.async('handlebars',function(){
        var data = {
            data:'738951'
        };
        var tpl = require('/layout/shopList/shopListSort.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#shopListSort").html(html);
        // $("#navbarSearch").html(tpl);
    });
})