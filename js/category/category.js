/**
 * Created by Administrator on 2017/3/28.
 */
define(function (require, exports, module) {

    require('jquery');
    require('/js/utils/getCurrentPage');
    // require('mockjs');
    require('store');
    require('siteUrl');


    jQuery.support.cors = true;
    $(function () {
        getCurrentPage();
        initCategoryActive();
        initDataToLS();
        function initDataToLS(){
            store.set("username","13167161025");
        }

        $(document).on('click','.productCategory a',function (e) {
            e.preventDefault();
            // console.log(this);
            getProductDetail($(this).data("product-id"));

        });




        // $.ajax({
        //     url:"",
        //     dataType:"json",
        //     type:"post",
        //     data:{},
        //     success:function (data) {
        //         // productCategory
        //         require.async('handlebars',function(){
        //             var getData = data;
        //             var tpl = require('/layout/cartgory/productCategory.tpl');
        //             var template = Handlebars.compile(tpl);
        //             var html = template(getData);
        //             $("#productCategory").html(html);
        //             getNavSubText();
        //         });
        //     }
        // });

        //主分类
        $(document).on('click','.nav-tabbar-item .nav-text',function(e){
            // e.preventDefault();
            var $this = $(this);
            $("#categoryId").val($this.data("category-id"));
            var w = $this.offset().left;
            $(".nav-tabbar-item .nav-text").removeClass("active");
            $this.find("span.nav-text").addClass("active");
            $("#tabbar-bottomline").css("transform","translate3d("+w+"px, 0px, 0px)");

            //点击获取二级菜单
            $.ajax({
                url:BASE_URL+PRODUCT_SITE_URLS.FIND_SUBS.URL,
                dataType:PRODUCT_SITE_URLS.DATATYPE,
                type:PRODUCT_SITE_URLS.FIND_SUBS.METHOD,
                data:{username:username,id:$("#categoryId").val()},
                success:function (data) {
                    // navSubPosition
                    require.async('handlebars',function(){
                        var getData = data;
                        var tpl = require('/layout/cartgory/navSubPosition.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(getData);
                        $("#navSubPosition").html(html);
                        $("#categorySubId").val($this.data("category-sub-id"));
                        $(".nav-sub-text").first().addClass("active");
                    });

                    getProductInfo();
                }
            });
        });
        //二级分类
        $(document).on('click','.nav-sub-tabbar-item .nav-sub-text',function (e) {
            var $this = $(this);
            $(".nav-sub-render .nav-sub-text").removeClass("active");
            $this.addClass("active");
            $("#categorySubId").val($this.data("category-sub-id"));
            getProductInfo();
        });


        // getNavSubText();
    });

    function getProductDetail(id){
        var productId = id;
        store.set("currentProductID",productId);
        location.href = '/html/detail/detail.html';
    }




    function getProductInfo(){
        var categoryIdsHidden = $("#categoryId").val();
        var categorySubId = $("#categorySubId").val();
        var keyword = '';
        var pageNumber = '';
        var categoryIds = [categoryIdsHidden,categorySubId];
        var brandIds = '';
        var startPrice = '';
        var endPrice = '';
        var pageSize = '';

        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_SEARCH.URL,
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            type:PRODUCT_SITE_URLS.PRODUCT_SEARCH.METHOD,
            data: {
                keyword: keyword,
                pageNumber: pageNumber,
                categoryIds: categoryIds,
                brandIds: brandIds,
                startPrice: startPrice,
                endPrice: endPrice,
                pageSize: pageSize
            },
            success:function (data) {
                // productCategory
                require.async('handlebars',function(){
                    if(data.authStatus == "200"){
                        var tpl = require('/layout/cartgory/productCategory.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#productCategory").html(html);
                    }
                });
            }
        });
    }

    var username = store.get("username");



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
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.FIND_ROOTS.URL,
            type:PRODUCT_SITE_URLS.FIND_ROOTS.METHOD,
            dataType:"json",
            data:{username:username},
            success:function (data) {
                if(data.authStatus == "200"){
                    var tpl = require('/layout/cartgory/mainNav.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#mainNav").html(html);
                }
            }
        })
    });

    // navSubPosition
    require.async('handlebars',function(){
        var categoryId = $("#categoryId").val();
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.FIND_SUBS.URL,
            type:PRODUCT_SITE_URLS.FIND_SUBS.METHOD,
            data:{username:username,id:'105'},
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            success:function (data) {
                var tpl = require('/layout/cartgory/navSubPosition.tpl');
                var template = Handlebars.compile(tpl);
                var html = template(data);
                $("#navSubPosition").html(html);
            }
        });

    });

    // productCategory
    require.async('handlebars',function(){
        var keyword = '';
        var pageNumber = '';
        var categoryIds = [105,112];
        var brandIds = '';
        var startPrice = '';
        var endPrice = '';
        var pageSize = '';
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_SEARCH.URL,
            type:PRODUCT_SITE_URLS.PRODUCT_SEARCH.METHOD,
            data: {
                keyword: keyword,
                pageNumber: pageNumber,
                categoryIds: categoryIds,
                brandIds: brandIds,
                startPrice: startPrice,
                endPrice: endPrice,
                pageSize: pageSize
            },
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            success:function (data) {
                // console.log(data);
                if(data.authStatus == "200"){
                    var tpl = require('/layout/cartgory/productCategory.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#productCategory").html(html);
                }
            }
        });
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