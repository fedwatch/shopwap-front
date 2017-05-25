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

    //USERMD
    var username = store.get("username");
    var currentProductID = store.get("currentProductID");
    var userStatus = store.get("userStatus");

    jQuery.support.cors = true;
    $(function () {
        setSpecificationId();

        //监听 购物车
        $(document).on('click', ".cart-badge", function () {
            if(userStatus){
                getCartCount(username, ".cart-badge > .badge");
                var sum = $(".cart-badge > .badge").text();
                if (sum == "0") {
                    $.toast("请添加商品");
                    return;
                } else {
                    window.location.href = "/m/html/cart/cart.html";
                }
            }else{
                $.toast("请登录才可以进行后续操作");
                return location.href = '/m/html/my/login/login.html';
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




        //立即下单
        $(document).on('click', ".buyNowBtn", function () {
            // location.href = "/html/payment/payment.html";
            if(userStatus){
                window.location.href = "/m/html/order/order.html";
            }else{
                $.toast("请登录才可以进行后续操作");
                return location.href = '/m/html/my/login/login.html';
            }

        });

        //边缘遮罩层 *
        $(".goods-detail-mask").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".goods-details-page").hide();
            $("#goodsDetailMask").hide();
        });

        //规格
        $(document).on('click', '.spec-button', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $this.parent().find(".spec-button").removeClass("active");
            $this.addClass("active");

            var len = $(".popup-page > .spec-button.active").length;
            var i = 0;
            var text = [];
            for (i = 0; i < len; i++) {
                text += $(".popup-page > .spec-button.active").eq(i).text() + ","

            }
            $("#specResult").val(text);
            $("#cartState").val("true");
        });

        //数量 -
        $(document).on('click', ".goods-minus-btn", function (e) {

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
        $(document).on('click', ".goods-plus-btn", function (e) {

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



    function addToCart() {
        if (userStatus){
            var amount = store.get("amount");
            calculateFreight(username, currentProductID, amount, "shippingCost");


            var cartState = $("#cartState").val();
            if (cartState == "false") {
                $("#goodsDetailMask").show();
                $("#goodsDetailsPage").show();

            } else if (cartState == "true") {
                $("#goodsDetailMask").hide();
                $("#goodsDetailsPage").hide();
            }

            var count = $("input[name=goodsNumber]").val();


            if (cartState == "true") {
                $.ajax({
                    url: BASE_URL + CART_SITE_URL.CART_ADD.URL,
                    type: CART_SITE_URL.CART_ADD.METHOD,
                    data: {
                        username: username,
                        productId: currentProductID,
                        quantity: count
                    },
                    cache:false,
                    async:false,
                    dataType: CART_SITE_URL.DATATYPE,
                    success: function (data) {
                        if (data.authStatus == "200") {
                            getCartCount(username, ".cart-badge > .badge");
                            $("#cartState").val(false)
                        }

                    }
                })
            }
        }else{
            $.toast("请登录才可以进行后续操作");
            location.href = '/m/html/my/login/login.html';
        }

    }


    // 设置选择规格到html
    function setTextToSpecShow() {
        var sm = "";
        var specResult = $("#specResult").val();
        var colorResult = $("#colorResult").val() || $(".popup-page >.color-button.number-input.active").text();
        var numberResult = $("#numberResult").val() || 1;
        sm = specResult + "," + colorResult + "," + numberResult;
        $("#specShow").html(sm);
    }


    require.async('handlebars', function () {

        // usermd
        $.ajax({
            url: BASE_URL + PRODUCT_SITE_URLS.PRODUCT_VIEW.URL,
            type: PRODUCT_SITE_URLS.PRODUCT_VIEW.METHOD,
            data: {
                username: username,
                id: currentProductID
            },
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (results) {
                var data = results;
                if (data.authStatus == "200") {
                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/detail/productSlider.tpl');
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
                            var tpl = require('/m/layout/detail/goodsDetailsPage.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#goodsDetailsPage").html(html);
                        })
                    });


                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/detail/topLinkMenu.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#topLinkMenu").html(html);
                    });
                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/detail/cartDetailFooter.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartDetailFooter").html(html);
                        //获取已有购物车物品数量
                        getCartCount(username, ".cart-badge > .badge");
                    });

                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/detail/detailOne.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailOne").html(html);

                    });
                    //七天无理由退换
                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/common/cartIndex.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartIndex").html(html);
                    });

                    //detailPromo
                    require.async('handlebars', function () {
                        require.async('transDetails', function () {
                            var tpl = require('/m/layout/detail/detailPromo.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#detailPromo").html(html);

                        });
                    });

                    //detailWrapper
                    require.async('handlebars', function () {
                        var tpl = require('/m/layout/detail/detailWrapper.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailWrapper").html(html);
                    });

                }
            }
        })


    });

    /**
     *
     */
    function setSpecificationId() {
        // usermd
        $.ajax({
            url: BASE_URL + PRODUCT_SITE_URLS.PRODUCT_VIEW.URL,
            type: PRODUCT_SITE_URLS.PRODUCT_VIEW.METHOD,
            data: {
                username: username,
                id: currentProductID
            },
            cache:false,
            async:false,
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (results) {
                var specificationValues = results["product"].specificationValues;
                var productSpec = [];
                specificationValues.map(function (data) {
                    productSpec.push(data.id)
                });
                var len = productSpec.length;
                for (var i = 0; i < len; i++) {
                    $("#specification-id-" + productSpec[i]).removeClass("active").addClass("active");
                }
            }
        })
    }


    /**
     * 计算运费
     * @param username
     * @param id
     * @param buyCount
     * @param DOM
     */
    function calculateFreight(username, id, buyCount, DOM) {
        // usermd
        $.ajax({
            url: BASE_URL + PRODUCT_SITE_URLS.CALCULATE_FREIGHT.URL,
            type: PRODUCT_SITE_URLS.CALCULATE_FREIGHT.METHOD,
            data: {
                username: username,
                id: id,
                buyCount: buyCount
            },
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (data) {
                // console.log(data);
                if (data.authStatus == "200") {
                    $("#" + DOM).text(data.freight);
                }
            }
        })
    }

    //获取购物车数据
    function getCartCount(username, DOM) {
        // usermd
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_COUNT.URL,
            type: CART_SITE_URL.CART_COUNT.METHOD,
            data: {
                username: username,
            },
            dataType: CART_SITE_URL.DATATYPE,
            success: function (data) {
                if (data.authStatus == "200") {
                    var sum = data.count;
                    store.set("amount", sum);
                    $(DOM).text(sum);
                }
            }
        })
    }


});