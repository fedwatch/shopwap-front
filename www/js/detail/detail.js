/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require, exports, module) {

    //USERMD
    var username = store.get("username");
    var currentProductID = store.get("currentProductID");
    var userStatus = store.get("userStatus");

    jQuery.support.cors = true;
    $(function () {
        if(typeof currentProductID == 'undefined'){
            $.toast("非法访问! 2 秒后跳转到首页",2000);

            setTimeout(function () {
                location.href = '../index.html';
            },2000)
        }


        // $("img.lazy").lazyload({
        //     threshold : 0,
        //     effect : "fadeIn",
        // });

        setSpecificationId(username,currentProductID)

        //监听 购物车
        $(document).on('click', ".cart-badge", function () {
            if(userStatus){
                getCartCount(username, ".cart-badge > .badge");
                var sum = $(".cart-badge > .badge").text();
                if (sum == "0") {
                    $.toast("请添加商品");
                    return;
                } else {
                    window.location.href = "/www/html/cart/cart.html";
                }
            }else{
                $.toast("请登录才可以进行后续操作");
                return location.href = '/www/html/my/login/login.html';
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
            if(userStatus){
                var cartState = $("#cartState").val();
                if (cartState == "false") {
                    $("#goodsDetailMask").show();
                    $("#goodsDetailsPage").show();
                } else if (cartState == "true") {
                    $("#goodsDetailMask").hide();
                    $("#goodsDetailsPage").hide();
                }
                if (cartState == "true") {
                    var username = store.get("username");
                    var currentProductID = store.get("currentProductID");
                    var count = $("input[name=goodsNumber]").val();
                    if(typeof username !== 'undefined' && typeof currentProductID !== 'undefined' && typeof count !== 'undefined'
                        &&  username !== '' && currentProductID !== '' && count !== ''){
                        store.set("mark",true);
                    }else{
                        store.set("mark",false);
                    }
                    var mark = store.get("mark");
                    if(mark == true){
                        addCartForBuyNow(username,currentProductID,count)
                    }
                }
            }else{
                $.toast("请登录才可以进行后续操作",2000);
                setTimeout(function () {
                    location.href = '/www/html/my/login/login.html';
                },2000)
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


    /**
     *
     * @param username
     * @param currentProductID
     * @param count
     * @returns
     *  authMsg:"success"
     *  authStatus:"200"
     *  count:1
     *  itemId:3081
     */
    function addCartForBuyNow(username,currentProductID,count){
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_ADD.URL,
            type: CART_SITE_URL.CART_ADD.METHOD,
            data: {
                username: username,
                productId: currentProductID,
                quantity: count
            },
            cache:true,
            async:false,
            dataType: CART_SITE_URL.DATATYPE,
            success: function (data) {
                if (data.authStatus == "200") {
                    if(data.itemId){
                        store.set("cartItemId",[data.itemId]);
                        $("#cartState").val(false)
                        return location.href = "/www/html/order/order.html";
                    }else{
                        console.log("item id 不存在")
                    }

                }
            }
        })
    }

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
            store.set("currentProductCount",count);
            if (cartState == "true") {
                $.ajax({
                    url: BASE_URL + CART_SITE_URL.CART_ADD.URL,
                    type: CART_SITE_URL.CART_ADD.METHOD,
                    data: {
                        username: username,
                        productId: currentProductID,
                        quantity: count
                    },
                    cache:true,
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
            location.href = '/www/html/my/login/login.html';
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
            cache:true,
            async:false,
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (results) {
                var data = results;
                if (data.authStatus == "200") {
                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/detail/productSlider.tpl');
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
                            var tpl = require('/zqVue/shopwap-front/www/layout/detail/goodsDetailsPage.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#goodsDetailsPage").html(html);
                        })
                    });


                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/detail/topLinkMenu.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#topLinkMenu").html(html);
                    });
                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/detail/cartDetailFooter.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartDetailFooter").html(html);
                        //获取已有购物车物品数量
                        getCartCount(username, ".cart-badge > .badge");
                    });

                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/detail/detailOne.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailOne").html(html);

                    });
                    //七天无理由退换
                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/common/cartIndex.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#cartIndex").html(html);
                    });

                    //detailPromo
                    require.async('handlebars', function () {
                        require.async('transDetails', function () {
                            var tpl = require('/zqVue/shopwap-front/www/layout/detail/detailPromo.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#detailPromo").html(html);

                        });
                    });

                    //detailWrapper
                    require.async('handlebars', function () {
                        var tpl = require('/zqVue/shopwap-front/www/layout/detail/detailWrapper.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#detailWrapper").html(html);
                    });

                }
                else if (data.authStatus == "500"){
                   console.log(data.authMsg);
                }
            }
        })


    });

    /**
     * 设置产品的规格
     * @param username
     * @param currentProductID
     */
    function setSpecificationId(username,currentProductID) {
        // usermd
        $.ajax({
            url: BASE_URL + PRODUCT_SITE_URLS.PRODUCT_VIEW.URL,
            type: PRODUCT_SITE_URLS.PRODUCT_VIEW.METHOD,
            data: {
                username: username,
                id: currentProductID
            },
            cache:true,
            async:false,
            dataType: PRODUCT_SITE_URLS.DATATYPE,
            success: function (data) {
                if(data.authStatus == '200'){
                    if(data["product"]){
                        var specificationValues = data["product"].specificationValues;
                        var productSpec = [];
                        specificationValues.map(function (data) {
                            productSpec.push(data.id)
                        });
                        var len = productSpec.length;
                        for (var i = 0; i < len; i++) {
                            $("#specification-id-" + productSpec[i]).removeClass("active").addClass("active");
                        }
                    }
                }else{
                    $.toast(data.authMsg);
                    return history.go(-1);
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
            cache:true,
            async:false,
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
            cache:true,
            async:false,
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