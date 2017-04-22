/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');
    require('mockjs');
    require('light7');
    require('store');

    var genData = {
        "stateCode": "200",
        "images": [
            {
                "url": "//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg",
                "alt": "AD"
            },
            {
                "url": "//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg",
                "alt": "VC"
            },
            {
                "url": "//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg",
                "alt": "AC"
            },
        ],
        "detailImage": "//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg",
        // "productName": "基金0022",
        "productName": "A6",
        "productId": "624415686",
        // "storeName": "巨欧基金",
        "storeName": "中旗集团",
        "storeId": "11111102",
        "productPrice": "2.00",
        "shippingCost": "1.00",
        "productPlace": "广州深圳",
        "promotion": "3",
        "spec": ["XS", "S", "M", "L", "XL", "XXL"],
        "color": [
            "宝石蓝",
            "水墨蓝",
            "樱草色",
            "暗蓝光紫",
            "霓虹绿",
            "淡麒麟",
            "暗卡其",
            "雨林绿",
        ],
        "productDescription": "老兵忍",
        "inStock": "68",
        "productDetails": '<div><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""><img src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt=""></div>',
        "review": "10000"
    }
    Mock.mock(/\/detail\/initGoodData$/, genData);





    $(function () {
        cartNums = 0;
        initCartData();
        initGoodData();

        //
        function initCartData() {
            $(".popup-page > .spec-button").first().addClass("active");
            $(".popup-page > .color-button").first().addClass("active");
            if (typeof store.get("cartData") !== "undefined") {
                var res = store.get("cartData").item;
                var l = res.length;
                var sum = 0;
                for(var i = 0;i<l;i++){
                    sum +=res[i].cart.length;
                }
                cartNums = sum;
                $(".cart-badge > .badge").text(sum)
            } else {
                $(".cart-badge > .badge").text("0");
            }
        }
        //
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
            var len = cartNums || 0;
            $("#goodsDetailsPage").show();
            $("#goodsDetailMask").show();
            // if (typeof store.get("cartData") !== "undefined") {
            //      len = store.get("cartData").length
            //
            //     var res = store.get("cartData").item;
            //     var l = res.length;
            //     var sum = 0;
            //     for(var i = 0;i<l;i++){
            //         sum +=res[i].cart.length;
            //     }
            //
            // } else {
            //      len = 0
            // }
            var addNum = parseInt(len);
            if ($("#cartState").val() == "true" && $("#goodsDetailsPage").css("display") == "block") {
                addNum = addNum + 1;
                cartNums = addNum;
                $(".cart-badge > .badge").text(cartNums);
                setTextToSpecShow();
                $("#cartState").val("false");
                $("#goodsDetailsPage").hide();
                $("#goodsDetailMask").hide();

                if($("#numberResult").val() == "" || $("#numberResult").val() == null){
                    $("#numberResult").val(1);
                }
                var cartData = {
                    productUrl: location.href,
                    thumbnailUrl: $(".swiper-slide.swiper-slide-visible.swiper-slide-active>img")[0].src,
                    productName: $(".product-title").text(),
                    productId: $("#productId").val(),
                    productPrice: $("#productPrice").text(),
                    productDescription: $("#productDescription").text(),
                    productState: true,
                    shippingCost:$("#shippingCost").text(),
                    specResult: $("#specResult").val(),//规格
                    colorResult: $("#colorResult").val(),//色彩
                    quant: $("#numberResult").val(),//数量
                };

                item.item.push({storeId:$("#storeId").val(),storeName:$("#storeName").val(),cart:cart});

                cart.push(cartData);


                if (typeof store.get("cartData") !== "undefined") {
                    // cartData 已经存在值
                    var sItem = store.get("cartData").item;
                    var sItemlen = sItem.length;
                    var cartStoreId = [];//购物车已存在店铺ID
                    var currentStoreId = $("#storeId").val();//当前店铺ID

                    for(var i = 0; i < sItemlen;i++){
                        cartStoreId.push(sItem[i].storeId);
                    }

                    if(cartStoreId.indexOf(currentStoreId) == "-1"){
                        // 当前店铺ID 不在 购物车已存在店铺ID 中
                        cartStoreId.push(currentStoreId);
                        item = store.get("cartData");
                        var zItem = {
                            storeId: $("#storeId").val(),
                            storeName: $("#storeName").val(),
                            cart:cart
                        };
                        item.item.push(zItem);
                        store.set("cartData", item);
                    }else{
                        // 当前店铺ID 在 购物车已存在店铺ID 中
                        var key =0;
                        var pkey = 0;
                        //搜索重复项并返回下标
                        for(var i = 0 ; i<sItemlen;i++){
                            for(var j = i+1;j<sItemlen;j++){
                                if(cartStoreId[i] == cartStoreId[j]){
                                    return key = i;
                                }
                            }
                        }
                        // console.log(cartStoreId)
                        // console.log(currentStoreId)
                        if(cartStoreId.indexOf(currentStoreId) !== "-1"){
                            for(var i = 0; i < cartStoreId.length ; i++){
                                if( currentStoreId == cartStoreId[i]){
                                    pkey = i;
                                }
                            }
                            //存入对应项数据
                            item = store.get("cartData");
                            item.item[pkey].cart.push(cartData);
                            store.set("cartData", item);
                        }

                        // console.log(pkey)

                    }
                } else {
                    // cartData 未存在值
                    store.set("cartData",item);
                }
            } else if($("#cartState").val() == "true"){
                $.toast("您的购物车中已经有了相同的商品！")
            }
        }

        //立即下单
        $(".buyNowBtn").on('click', function () {
            // location.href = "/html/payment/payment.html";
            location.href = "/html/order/order.html";
        });

        //边缘遮罩层 *
        $(".goods-detail-mask").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".goods-details-page").hide();
            $("#goodsDetailMask").hide();
        });

        //规格
        $(".spec-button").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $(".spec-button").removeClass("active");
            $this.addClass("active");
            var specResult = $this.text();
            $("#specResult").val(specResult);
            $("#cartState").val("true");
        });

        //颜色
        $(".color-button").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $(".color-button").removeClass("active");
            $this.addClass("active");
            var colorResult = $this.text();
            $("#colorResult").val(colorResult);
            $("#cartState").val("true");
        });

        //数量 -
        $(".goods-minus-btn").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
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
        $(".goods-plus-btn").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
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

    // 初始化商品详情商品列表数据
    function initGoodData() {
        $.ajax({
            url: "/detail/initGoodData",
            dataType: "json",
            type: "post",
            data: {},
            success: function (data) {
                // productSlider
                require.async('handlebars', function () {
                    var getData = data;
                    var tpl = require('/layout/detail/productSlider.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(getData);
                    $("#productSlider").html(html);

                    var storeId = data["storeId"];
                    var storeName = data["storeName"];
                    var productId = data["productId"];
                    var productName = data["productName"];

                    $("#storeId").val(storeId);
                    $("#storeName").val(storeName);
                    $("#productId").val(productId);
                    $("#productName").val(productName);

                    var productImagesSlider = new Swiper('.product-images-slider', {
                        // pagination:'.swiper-pagination',
                        // autoplay:'1000',
                        spaceBetween: '10'
                    });
                });
            }
        })
    }



    // cartIndex
    require.async('handlebars', function () {
        var storeData = {
            data: '7795'
        };
        var tpl = require('/layout/common/cartIndex.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartIndex").html(html);
    });

    // topLinkMenu
    require.async('handlebars', function () {
        var data = {
            data: '738951'
        };
        var tpl = require('/layout/detail/topLinkMenu.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#topLinkMenu").html(html);
    });


    // cartDetailFooter
    require.async('handlebars', function () {
        var data = {
            data: '738951'
        };
        var tpl = require('/layout/detail/cartDetailFooter.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#cartDetailFooter").html(html);
    });


    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/layout/detail/goodsDetailsPage.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#goodsDetailsPage").html(html);
    });

    require.async('handlebars', function () {

        var data = genData;
        var tpl = require('/layout/detail/detailOne.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#detailOne").html(html);
    });

    //detailPromo

    var data = genData;
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
        var data = genData;
        var tpl = require('/layout/detail/detailWrapper.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#detailWrapper").html(html);
    });


})