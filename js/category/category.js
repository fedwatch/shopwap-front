/**
 * Created by Administrator on 2017/3/28.
 */
define(function (require, exports, module) {

    require('jquery');
    require('/js/utils/getCurrentPage');
    require('mockjs');



    $(function () {
        getCurrentPage();
        initCategoryActive();





        Mock.mock(/\/getNavSubTitle$/, {
            'result': [{
                'status': true,
            }],
            'navSubTitle': [
                {'subTitle': "日立"},
                {'subTitle': "松下"},
                {'subTitle': "海尔"},
                {'subTitle': "格力"},
                {'subTitle': "田荣"},
                {'subTitle': "丽景"}
            ]
        });

        Mock.mock(/\/getProductCategory$/, {
            'productLists': [
                {"name": "金兆 A510迷你 电磁茶炉","pngImg":"/assets/images/shop-list.png","price":"88.88","buyerNumber":"2000000","url":"/html/detail/detail.html"},
                {"name": "R9s 玫瑰金 前后1600万像素","pngImg":"http://static.oppo.com/archives/201702/20170209020257589c0a8583ba9.png","price":"2799.00","buyerNumber":"2000000","url":""},
                {"name": "蟹知秋 麻辣虾尾 500g 第二件半价","pngImg":"http://img35.iblimg.com/photo-5/2000/321150024_360x360.jpg","price":"128.00","buyerNumber":"524811","url":""},
                {"name": "狮王（LION）ETIQUETTE清新口喷(木糖醇薄荷)5ml","pngImg":"http://img31.iblimg.com/goods-42/3030/2016/11/SP_3030_303001502041_01_10007.jpg","price":"21.90","buyerNumber":"2000000","url":""},
                {"name": "德佩龙侯爵 精选干红葡萄酒红酒 IGP","pngImg":"http://img35.iblimg.com/goods-42/3030/2016/11/SP_3030_303001375173_01_10007.jpg","price":"50.00","buyerNumber":"5689901","url":""},
                {"name": "MICHAEL KORS 迈克科尔斯 女士黑色牛皮手提单肩包","pngImg":"http://img32.iblimg.com/photo-5/3030/1553638115_360x360.jpg","price":"2630.00","buyerNumber":"65001","url":""},
            ]
        });

        Mock.mock(/\/getProductCategoryFirst$/, {
            'productLists': [
                {"name": "MICHAEL KORS 迈克科尔斯 女士黑色牛皮手提单肩包","pngImg":"http://img32.iblimg.com/photo-5/3030/1553638115_360x360.jpg","price":"2630.00","buyerNumber":"65001","url":""},
                {"name": "R9s 玫瑰金 前后1600万像素","pngImg":"http://static.oppo.com/archives/201702/20170209020257589c0a8583ba9.png","price":"2799.00","buyerNumber":"2000000","url":""},
                {"name": "金兆 A510迷你 电磁茶炉","pngImg":"/assets/images/shop-list.png","price":"88.88","buyerNumber":"2000000","url":"/html/detail/detail.html"},
                {"name": "蟹知秋 麻辣虾尾 500g 第二件半价","pngImg":"http://img35.iblimg.com/photo-5/2000/321150024_360x360.jpg","price":"128.00","buyerNumber":"524811","url":""},
                {"name": "狮王（LION）ETIQUETTE清新口喷(木糖醇薄荷)5ml","pngImg":"http://img31.iblimg.com/goods-42/3030/2016/11/SP_3030_303001502041_01_10007.jpg","price":"21.90","buyerNumber":"2000000","url":""},
                {"name": "德佩龙侯爵 精选干红葡萄酒红酒 IGP","pngImg":"http://img35.iblimg.com/goods-42/3030/2016/11/SP_3030_303001375173_01_10007.jpg","price":"50.00","buyerNumber":"5689901","url":""},
            ]
        });

        $.ajax({
            url:"/getProductCategoryFirst",
            dataType:"json",
            type:"post",
            data:{},
            success:function (data) {
                // productCategory
                require.async('handlebars',function(){
                    var getData = data;
                    var tpl = require('/layout/cartgory/productCategory.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(getData);
                    $("#productCategory").html(html);
                    getNavSubText();
                });
            }
        });

        $(".nav-tabbar-item").on('click',function(){
            var $this = $(this);
            var w = $this.offset().left;
            $(".nav-tabbar-item .nav-text").removeClass("active");
            $this.find("span.nav-text").addClass("active");
            $("#tabbar-bottomline").css("transform","translate3d("+w+"px, 0px, 0px)");

            $.ajax({
                url:"/getNavSubTitle",
                dataType:'json',
                type:'post',
                data:{},
                success:function (data) {
                    console.log("run")
                    // navSubPosition
                    require.async('handlebars',function(){
                        var getData = data;
                        var tpl = require('/layout/cartgory/navSubPosition.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(getData);
                        $("#navSubPosition").html(html);
                        $(".nav-sub-text").first().addClass("active");
                    });

                    $.ajax({
                        url:"/getProductCategory",
                        dataType:"json",
                        type:"post",
                        data:{},
                        success:function (data) {
                            // productCategory
                            require.async('handlebars',function(){
                                var getData = data;
                                var tpl = require('/layout/cartgory/productCategory.tpl');
                                var template = Handlebars.compile(tpl);
                                var html = template(getData);
                                $("#productCategory").html(html);
                                getNavSubText();
                            });
                        }
                    });
                }
            });
        });
        getNavSubText();
    });

    function getNavSubText() {
        $(".nav-sub-text").on('click',function (e) {
            e.preventDefault();
            var $this = $(this);
            $(".nav-sub-render .nav-sub-text").removeClass("active");
            $this.addClass("active");
        });
    }

    function initCategoryActive(){
        $(".nav-tabbar-item").first().find(".nav-render > .nav-text").addClass("active");
        $(".nav-sub-text").first().addClass("active");
    }

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
        $("#productListPage").html(html);
        // $("#navbarSearch").html(tpl);
    });



    // mainNav
    require.async('handlebars',function(){
        var data = {
            mainTitle: ["家居","女装","男装","鞋帽","配饰","家纺"]
        };
        var tpl = require('/layout/cartgory/mainNav.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#mainNav").html(html);
    });

    // navSubPosition
    require.async('handlebars',function(){
        var data = {
            navSubTitle: [
                {subTitle: "Polo 杉"},
                {subTitle: "BQ"},
                {subTitle: "CQ"},
                {subTitle: "DQ"},
                {subTitle: "EQ"},
                {subTitle: "FQ"}
            ]
        };
        var tpl = require('/layout/cartgory/navSubPosition.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#navSubPosition").html(html);
    });

    // productCategory
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/cartgory/productCategory.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#productCategory").html(html);
    });

    // footerNav
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footerNavPage").html(html);
        // $("#navbarSearch").html(tpl);
    });
})