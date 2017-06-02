/**
 * Created by Administrator on 2017/3/28.
 */
define(function (require, exports, module) {
    require('jquery');
    require("iscrollProbe");
    require("page");
    require('getCurrentPage');
    // require("lazyload");
    require('store');
    require('siteUrl');


    jQuery.support.cors = true;
    var username = store.get("username");

    $(function () {
        getCurrentPage();

        // function lazyload(){
        //     $("img.lazy").lazyload({
        //         threshold : 10,
        //         effect : "show",
        //         failure_limit: 10,
        //         event: "scroll",
        //         no_fake_img_loader:true
        //     });
        // }


        initCategoryActive();

        /**
         *
         */
        $(document).on('click','.productCategory a',function (e) {
            e.preventDefault();
           //console.log(this);
            getProductDetail($(this).data("product-id"));
        });


        /**
         * 主分类
         */
        $(document).on('click','.nav-tabbar-item .nav-text',function(e){
            // e.preventDefault();
            var $this = $(this);
            $("#categoryId").val($this.data("category-id"));
            var w = $this.offset().left;
            $(".nav-tabbar-item .nav-text").removeClass("active");
            $this.addClass("active");
            var tabbarBottomline = $("#tabbar-bottomline");
            tabbarBottomline.css("transform","translate3d("+w+"px, 0px, 0px)");
            var textLen = $(this).text().length;


            //点击获取二级菜单
            $.ajax({
                url:BASE_URL+PRODUCT_SITE_URLS.FIND_SUBS.URL,
                dataType:PRODUCT_SITE_URLS.DATATYPE,
                type:PRODUCT_SITE_URLS.FIND_SUBS.METHOD,
                data:{username:username,id:$("#categoryId").val()},
                async:false,
                cache:true,
                success:function (data) {
                    // navSubPosition
                    require.async('handlebars',function(){
                        var getData = data;
                        var tpl = require('/m/layout/cartgory/navSubPosition.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(getData);
                        $("#navSubPosition").html(html);
                        $("#categorySubId").val($this.data("category-sub-id"));
                        $(".nav-sub-text").first().addClass("active");

                    });
                    // $("img.lazy").lazyload({
                    //     threshold : 0,
                    //     effect : "show",
                    //     failure_limit: 10,
                    //     event: "scroll",
                    //     no_fake_img_loader:true
                    // });
                    getProductInfo();
                }
            });

            // $("img.lazy").lazyload({
            //     threshold : 0,
            //     effect : "show",
            //     failure_limit: 10,
            //     event: "scroll",
            //     no_fake_img_loader:true
            // });


        });

        //二级分类
        $(document).on('click','.nav-sub-tabbar-item .nav-sub-text',function (e) {
            var $this = $(this);
            $(".nav-sub-render .nav-sub-text").removeClass("active");
            $this.addClass("active");
            $("#categorySubId").val($this.data("category-sub-id"));
            getProductInfo();
            // $("img.lazy").lazyload({
            //     threshold : 0,
            //     effect : "show",
            //     failure_limit: 10,
            //     event: "scroll",
            //     no_fake_img_loader:true
            // });
        });
    });

    function getProductDetail(id){
        var productId = id;
        store.set("currentProductID",productId);
        console.log(productId);
        location.href = '/m/html/detail/detail.html';
    }

//商品查询1
 function getProductInfo(){
        var categoryIdsHidden = $("#categoryId").val();
        var categorySubId = $("#categorySubId").val();
        var keyword = '';
        var pageNumber = '';
        var categoryIds = categoryIdsHidden+","+categorySubId;
        var brandIds = '';
        var startPrice = '';
        var endPrice = '';
        var pageSize = '';

     var pageOp = $("#productCategory").page({
         url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_SEARCH.URL,
         param:{},
         processResult:function(result){
             var html = "";
             if(result.products != null){
                 $.each(result.products, function(index, data){
                     html +='<div class="col-50 productCategory" >'+
                         '<a href="javascript:;"  data-product-id="'+data.id+'" class="external">'+
                         '<div style="background: #fff;padding:0 0;margin: .25rem 0;width:100%;height:12rem;overflow: hidden;">'+
                         '<img class="lazy" src="'+data.image+'"  alt="" style="width:100%;height:7rem;overflow: hidden;">'+
                         '<h4 class="product-title" style="padding:0 .25rem;font-size:.7rem;color:#000;">'+data.name+'</h4>'+
                     '<span class="product-price-box" style="padding:0 .25rem;font-size:.5rem;color:#ff0000;">￥<span style="font-size:.65rem;">'+data.price+'</span></span>'+
                     '<span class="product-buyer-number-box" style="font-size:.5rem;color:#999;">已有 <span>'+data.sales+'</span>人购买</span></div></a> </div>';
                 });

             }

             return html;
         }
     });
     pageOp.load({categoryIds:categoryIds});

/*        $.ajax({
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
            async:false,
            success:function (data) {
                // productCategory
                require.async('handlebars',function(){
                    if(data.authStatus == "200"){
                        var tpl = require('/m/layout/cartgory/productCategory.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#productCategory").html(html);
                    }
                });
            }
        });*/
    }



    function initCategoryActive(){
        $(".nav-tabbar-item").first().find(".nav-render > .nav-text").addClass("active");
        $(".nav-sub-text").first().addClass("active");
    }


    // mainNav
    require.async('handlebars',function(){
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.FIND_ROOTS.URL,
            type:PRODUCT_SITE_URLS.FIND_ROOTS.METHOD,
            dataType:"json",
            data:{username:username},
            cache:true,
            async:false,
            success:function (data) {

                if(data.authStatus == "200"){
                    var tpl = require('/m/layout/cartgory/mainNav.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#mainNav").html(html);

                    // navSubPosition
                    require.async('handlebars',function(){
                        var categoryId = data.productCategories[0].id ;
                        $.ajax({
                            url:BASE_URL+PRODUCT_SITE_URLS.FIND_SUBS.URL,
                            type:PRODUCT_SITE_URLS.FIND_SUBS.METHOD,
                            data:{username:username,id:categoryId},
                            dataType:PRODUCT_SITE_URLS.DATATYPE,
                            cache:true,
                            async:false,
                            success:function (data) {
                                if(data.authStatus == '200'){
                                    var tpl = require('/m/layout/cartgory/navSubPosition.tpl');
                                    var template = Handlebars.compile(tpl);
                                    var html = template(data);
                                    $("#navSubPosition").html(html);

                                    var categoryIdsHidden = categoryId;
                                    var categorySubId = data.productCategories[0].id;
                                    var keyword = '';
                                    var pageNumber = '1';
                                    var categoryIds = categoryIdsHidden+","+categorySubId;
                                    var brandIds = '';
                                    var startPrice = '';
                                    var endPrice = '';
                                    var pageSize = '20';
                                    getSearchResults(keyword,pageNumber,categoryIds,brandIds,startPrice,endPrice,pageSize,'productCategory');
                                }
                            }
                        });

                    });

                }
            }
        })
    });

    //商品查询
   function getSearchResults(keyword,pageNumber,categoryIds,brandIds,startPrice,endPrice,pageSize,DOM){
       var pageOp = $("#productCategory").page({
           url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_SEARCH.URL,
           param:{},
           processResult:function(result){
               var html = "";
               if(result.products != null){
                   $.each(result.products, function(index, data){
                       html +='<div class="col-50 productCategory" >'+
                           '<a href="javascript:;"  data-product-id="'+data.id+'" class="external">'+
                           '<div style="background: #fff;padding:0 0;margin: .25rem 0;width:100%;height:12rem;overflow: hidden;">'+
                           '<img class="lazy" src="'+data.image+'"  alt="" style="width:100%;height:7rem;overflow: hidden;">'+
                           '<h4 class="product-title" style="padding:0 .25rem;font-size:.7rem;color:#000;">'+data.name+'</h4>'+
                           '<span class="product-price-box" style="padding:0 .25rem;font-size:.5rem;color:#ff0000;">￥<span style="font-size:.65rem;">'+data.price+'</span></span>'+
                           '<span class="product-buyer-number-box" style="font-size:.5rem;color:#999;">已有 <span>'+data.sales+'</span>人购买</span></div></a> </div>';
                   });


               }

               return html;
           }
       });

       pageOp.load({
           keyword: keyword,
           pageNumber: pageNumber,
           categoryIds: categoryIds,
           brandIds: brandIds,
           startPrice: startPrice,
           endPrice: endPrice,
           pageSize: pageSize});

/*        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_SEARCH.URL,
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            type:PRODUCT_SITE_URLS.PRODUCT_SEARCH.METHOD,
            cache:true,
            async:false,
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
                        var tpl = require('/m/layout/cartgory/productCategory.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#"+DOM).html(html);
                    }
                });
               // $($(".nav-sub-render .nav-sub-text")[0]).addClass("active");
            }
        });*/
    }

    // footerNav
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/m/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footerNavPage").html(html);
        // $("#navbarSearch").html(tpl);
    });
})