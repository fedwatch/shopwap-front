/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require('store');
    require('mockjs');
    Mock.mock(/\/search\/keywords$/, {
        "stateCode": "200",
    });
    $(function(){
        var $searchHint = $('#searchHint');
        var $searchPrompt = $('#searchPrompt');
        var $searchVague = $('#searchVague');
        var $historySearch = $('#historySearch');
        var $clearHistoryBtn = $('#clearHistoryBtn');
        var $cancelSearchBtn = $('#cancelSearchBtn');
        var $leftFixNav = $('#leftFixNav');
        var $rightSearchNav = $('#rightSearchNav');
        var $cancelTextIcon = $('#cancelTextIcon');



        $searchHint.on("focus",function () {
            var $this = $(this);
            $this.parent().css({width: '100%'});
            $searchPrompt.show();
            $searchVague.hide();
            // $cancelTextIcon.hide();
            $leftFixNav.hide();
            $rightSearchNav.css({
                marginLeft: "0.5em",
                marginRight: "0.5em",
                display: "flex",
                alignItems: "center"
            });
            $this.on("keydown",function(){
                // searchPrompt
                // require.async('handlebars',function(){
                //     var data = genData;
                //     var tpl = require('/layout/search/searchPrompt.tpl');
                //     var template = Handlebars.compile(tpl);
                //     var html = template(data);
                //     $("#searchPrompt").html(html);
                //     // $("#navbarSearch").html(tpl);
                // });
                $cancelSearchBtn.hide();
                $cancelTextIcon.show();
            })
            $this.on('mouseleave',function () {
                $("#searchPrompt").hide();
            })
        });

        $("#searchForm").on('submit',function (e) {
            e.preventDefault();

            console.log('search keywords submit ');
            var insertSearch = store.get("historySearch").historySearch || [];
            var searchHint = $("#searchHint").val();
            insertSearch.push(searchHint);
            $.ajax({
                url:"/search/keywords",
                type:"POST",
                dataType:"json",
                success:function (data) {
                    if(data.stateCode == "200"){
                        $("#searchPrompt").hide();
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

                        require.async('handlebars',function(){
                            var getData = data;
                            var tpl = require('/layout/cartgory/productCategory.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(getData);
                            $("#shopListShowIndex").html(html);
                        });
                    }
                }
            });
            store.set("historySearch",{historySearch:insertSearch});
        });

        $cancelTextIcon.on('click',function () {
            $rightSearchNav.css({
                marginLeft: "3.0em",
                marginRight: "0.5em",
                // display: "flex",
                // alignItems: "center"
            });
            $leftFixNav.show();
            $cancelTextIcon.hide();
            $searchHint.val("");
        });

        $clearHistoryBtn.on("click",function () {
            store.set('historySearch','');
            $historySearch.empty();
            $(".history").hide();
        });



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

    // // shopListShowIndex
    // require.async('handlebars',function(){
    //     var data = {
    //         name:'KAMJOVE/金灶 K7智能电茶壶自动上水 304不锈钢烧水壶 电热水壶',
    //         brandName:'KAMJOVE',
    //         productName:'金灶',
    //         productCategory:'K7',
    //         feature:'智能电茶壶自动上水',
    //         keyword1:'304不锈钢烧水壶',
    //         keyword2:'电热水壶',
    //         keyword3:'不锈钢烧水壶',
    //         price:'200',
    //         decimalPrice:'30',
    //         purchasePeoples:'35837'
    //     };
    //     var tpl = require('/layout/shopList/shopListShowIndex.tpl');
    //     var template = Handlebars.compile(tpl);
    //     var html = template(data);
    //     $("#shopListShowIndex").html(html);
    //     // $("#navbarSearch").html(tpl);
    // });








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

    var genData = {
        hotSearch:[
            {keyword:"飘正阳绿翡翠A货",url:""},
            {keyword:"手表",url:""},
            {keyword:"钱包",url:""},
            {keyword:"香水",url:""},
            {keyword:"烟酒",url:""},
            {keyword:"保健品",url:""},
            {keyword:"手链",url:""},
            {keyword:"腰带",url:""},
            {keyword:"鞋子",url:""},
            {keyword:"戒指",url:""}
        ]
    };


    

    // searchHeader
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/searchHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchHeader").html(html);
        // $("#navbarSearch").html(tpl);
    });



    // searchVague
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/searchVague.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchVague").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // historySearch
    require.async('handlebars',function(){
        var historySearch = store.get('historySearch');
        if( historySearch == ''){
            $(".history").hide();
        }else if(historySearch !== ''){
            var data = historySearch;
            var tpl = require('/layout/search/historySearch.tpl');
            var template = Handlebars.compile(tpl);
            var html = template(data);
            $("#historySearch").html(html);
        }
    });

    // hotSearch
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/hotSearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#hotSearch").html(html);
    });
});
