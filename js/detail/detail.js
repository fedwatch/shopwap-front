/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');
    // require('mockjs');
    require('light7');
    require('store');
    require('siteUrl');



    jQuery.support.cors = true;
    $(function () {



        $(document).on('click', ".menuPopup", function () {
            var buttons1 = [
                {
                    text: '请选择',
                    label: true
                },
                {
                    text: '<div style="font-size:.8rem;">微信</div>',
                    // bold: true,
                    // color: 'danger',
                    onClick: function() {

                    }
                },
                {
                    text: '<div style="font-size:.8rem;">朋友圈</div>',
                    onClick: function() {

                    }
                }
            ];
            var buttons2 = [
                {
                    text: '<div style="font-size:.8rem;">取消</div>',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });
        //监听 购物车
        $(document).on('click', ".cart-badge", function () {
            // return location.href = "/html/cart/cart.html";
            if (typeof store.get("cartData") !== "undefined") {
                return location.href = "/html/cart/cart.html";
            } else {
                $.toast("很抱歉，您的购物车并没有任何商品！")
            }
        });

        //监听 请选择规格
        $(document).on('click', ".specifications-type", function () {
            if ($("#specShow").html() == "") {
                $("#goodsDetailsPage").show();
                $("#goodsDetailMask").show();
            }
        });

        var cart = [];
        var item = {};
        item.item = [];

        //监听 加入购物车
        $(document).on('click', '.addToCartBtn', addToCart);

        function addToCart() {
            var cartState = $("#cartState").val();
            if(cartState == "false" ){
                $("#goodsDetailMask").show();
                $("#goodsDetailsPage").show();

            }else if(cartState == "true"){
                $("#goodsDetailMask").hide();
                $("#goodsDetailsPage").hide();
            }

             var exitCount= $("input[name=goodsNumber]").val();
               store.set("username","13167161025");
              var username=store.get("username");
            if(cartState =="true"){
                $.ajax({
                    url:BASE_URL+CART_SITE_URL.CART_ADD.URL,
                    type:CART_SITE_URL.CART_ADD.METHOD,
                    data:{username:username,productId :'455',quantity:exitCount},
                    dataType:CART_SITE_URL.DATATYPE,
                    success:function(data){
                        if(data.authStatus=="200"){
                            getCartCount();
                            $("#cartState").val(false)
                        }

                    }
                })
            }
        }

        //立即下单
        $(document).on('click',".buyNowBtn", function () {
            // location.href = "/html/payment/payment.html";
            window.location.href = "/html/order/order.html";
        });

        //边缘遮罩层 *
        $(".goods-detail-mask").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".goods-details-page").hide();
            $("#goodsDetailMask").hide();
        });

        //规格
        $(document).on('click','.spec-button', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $this.parent().find(".spec-button").removeClass("active");
            $this.addClass("active");

            var len = $(".popup-page > .spec-button.active").length;
            var i = 0;
            var text = [];
            for(i = 0 ;i < len; i++){
                text += $(".popup-page > .spec-button.active").eq(i).text()+","

            }
            $("#specResult").val(text);




            $("#cartState").val("true");
        });

        // //颜色
        // $(".color-button").on('click', function (e) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     var $this = $(this);
        //     $(".color-button").removeClass("active");
        //     $this.addClass("active");
        //     var colorResult = $this.text();
        //     $("#colorResult").val(colorResult);
        //     $("#cartState").val("true");
        // });



        //数量 -
        $(document).on('click', ".goods-minus-btn",function (e) {
            if ($(".numbers-board > .goods-minus-btn").hasClass("active")) {
                var num = parseInt($("input[name=goodsNumber]").val());
                if (num == 1) {
                    $(".numbers-board > .goods-minus-btn").removeClass("active");
                    return;
                } else {
                    num = num - 1;
                }
                $("input[name=goodsNumber]").val(num);
                $("#numberResult").val(num);
                $("#cartState").val("true");
            } else {
                return;
            }
        });

        //数量 +
        $(document).on('click',".goods-plus-btn", function (e) {

            if ($(".numbers-board > .goods-plus-btn").hasClass("active")) {
                var num = parseInt($("input[name=goodsNumber]").val());
                num = num + 1;
                if (num > 1) {
                    $(".numbers-board > .goods-minus-btn").removeClass("active");
                    $(".numbers-board > .goods-minus-btn").addClass("active");
                }
                $("input[name=goodsNumber]").val(num);
                $("#numberResult").val(num);
                $("#cartState").val("true");
            } else {
                return;
            }
        });
    });

    // 设置选择规格到html
    function setTextToSpecShow() {
        var sm = "";
        var specResult = $("#specResult").val();
        var colorResult = $("#colorResult").val()||$(".popup-page >.color-button.number-input.active").text();
        var numberResult = $("#numberResult").val()||1;
        sm = specResult + "," + colorResult + "," + numberResult;
        $("#specShow").html(sm);
    }



    require.async('handlebars', function () {
        var username=store.get("username");
        var currentProductID=store.get("currentProductID");

        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.PRODUCT_VIEW.URL,
            type:PRODUCT_SITE_URLS.PRODUCT_VIEW.METHOD,
            data:{username:"13167161025",id:'455'},
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            success:function(results){
                console.log(results);


                var data = results;
                if(data.authStatus == "200"){

                    require.async('handlebars', function () {
                        var tpl = require('/layout/detail/productSlider.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#productSlider").html(html);

                        var productImagesSlider = new Swiper('.product-images-slider', {
                            // pagination:'.swiper-pagination',
                            // autoplay:'1000',
                            spaceBetween: '10'
                        });
                    });

                    //规格页
                    require.async('handlebars', function () {
                        require.async('transDetails', function () {
                            var tpl = require('/layout/detail/goodsDetailsPage.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#goodsDetailsPage").html(html);
                        })
                    });




                    require.async('handlebars', function () {
                        var tpl = require('/layout/detail/topLinkMenu.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#topLinkMenu").html(html);
                    });
                    require.async('handlebars', function () {
                        var tpl = require('/layout/detail/cartDetailFooter.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartDetailFooter").html(html);
                            //获取已有购物车物品数量
                             getCartCount();
                    });

                    require.async('handlebars', function () {
                        var tpl = require('/layout/detail/detailOne.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailOne").html(html);
                        calculateFreight(username,"455","804","2","shippingCost");
                    });
                    //七天无理由退换
                    require.async('handlebars', function () {
                        var tpl = require('/layout/common/cartIndex.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartIndex").html(html);
                    });

                    //detailPromo
                    require.async('handlebars', function () {
                        require.async('transDetails',function(){
                            var tpl = require('/layout/detail/detailPromo.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#detailPromo").html(html);

                        });
                    });

                    //detailWrapper
                    require.async('handlebars', function () {
                        var tpl = require('/layout/detail/detailWrapper.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailWrapper").html(html);
                    });

                }
            }
        })

    });


    /**
     * 计算运费
     * @param username
     * @param id
     * @param areaId
     * @param buyCount
     * @param DOM
     */
    function calculateFreight(username,id,areaId,buyCount,DOM){
        $.ajax({
            url:BASE_URL+PRODUCT_SITE_URLS.CALCULATE_FREIGHT.URL,
            type:PRODUCT_SITE_URLS.CALCULATE_FREIGHT.METHOD,
            data: {
                username: username,
                id: id,
                areaId: areaId,
                buyCount:buyCount
            },
            dataType:PRODUCT_SITE_URLS.DATATYPE,
            success:function(data){
                // console.log(data);
                if(data.authStatus == "200"){
                    $("#"+DOM).text(data.freight);
                }
            }
        })
    }

   //获取购物车数据
    function getCartCount(){
        $.ajax({
            url:BASE_URL+CART_SITE_URL.CART_COUNT.URL,
            type:CART_SITE_URL.CART_COUNT.METHOD,
            data:{username:"13167161025",id:'455'},
            dataType:CART_SITE_URL.DATATYPE,
            success:function(data){
                if(data.authStatus=="200"){
                    var sum=data.count;
                    $(".cart-badge > .badge").text(sum);
                }
            }
        })
    }





});