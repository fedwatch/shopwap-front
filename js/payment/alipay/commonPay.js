define(function (require, exports, module) {
    require("jquery");
    require("light7");
    // require("mockjs");
    require("siteUrl");
    require("store");
    require("getUser");

    var username = store.get("username");
    var mergeSn = store.get("mergeSn");
    var paymentPluginId = store.get("paymentPluginId");
    var allAmount = store.get("allAmount");
    var balance = store.get("balance");
    var isBalancePay = true;

    jQuery.support.cors = true;
    $(function () {


        payment(username, mergeSn);

        store.set("type", "payment");
        store.set("app_request", "3");

        $(document).on('click', '.modal-inner .bank-li a', function () {
            var $this = $(this);
            var cardId = $this.data("id")
            store.set("cardId", cardId);
            console.log(cardId);

            var paymentPluginId = store.get("paymentPluginId");
            var type = store.get("type") || "payment";
            var amount = store.get("amount");
            var app_request = store.get("app_request") || '3';
            var username = store.get("username");
            paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username);
        });


    });

    /***支付界面，合并支付
     * @param username
     * @param mergeSn
     * */
    function payment(username, mergeSn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.PAY_MENT.URL,
            type: ORDER_SITE_URL.PAY_MENT.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn: mergeSn
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    var paymentPluginId = data.paymentPlugins[0].id;
                    store.set("paymentPluginId", paymentPluginId);
                    var allAmount = data.allAmount;
                    store.set("allAmount", allAmount);
                    balance = data.balance;
                    store.set("balance", balance);

                    console.log(data);
                    console.log(mergeSn);
                    require.async("handlebars", function () {
                        var tpl = require('/layout/payment/alipay/commonPay.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#commonPay").html(html);

                        $("#payWay").find("#aliPay").text(data.allAmount);
                        //选择或添加银行卡
                        // checkBank();
                        //选择支付方式
                        choicePay();
                        //获取银行卡列表
                        getBankList(username);
                        initSureSubmit();


                        $("#balancePayBtn").click(function () {
                            if (isBalancePay == false) {
                                calculate_amount(username, mergeSn, paymentPluginId, isBalancePay);
                                isBalancePay = true;
                            } else {
                                calculate_amount(username, mergeSn, paymentPluginId, isBalancePay);
                                isBalancePay = false;
                            }
                        });

                    })

                }
            }
        })

    }


    //计算订单支付金额
    function calculate_amount(username, mergeSn, paymentPluginId, isBalancePay) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CALCULATE_AMOUNT.URL,
            type: ORDER_SITE_URL.CALCULATE_AMOUNT.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn: mergeSn,
                paymentPluginId: paymentPluginId,
                isUseBalance: isBalancePay
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    var amount = data.amount;
                    store.set("amount", amount);
                    if (isBalancePay == true) {
                        if (balance >= allAmount) {
                            $("#balance-yue").css({visibility: "visible"}).find("span").text(data.balancePay);
                            $("#paychoice").css({display: "none"});
                            $("#surePays").click(function () {

                                // window.location.href = "../alipay/paySuccess.html";
                            })
                        } else {
                            $("#balance-yue").css({visibility: "visible"}).find("span").text(data.balancePay);
                            $("#payWay").find("#aliPay").text(data.amount);
                        }
                    } else {
                        $("#paychoice").css({display: "block"});
                        $("#balance-yue").css({visibility: "hidden"});
                        $("#payWay").find("#aliPay").text(data.amount);
                    }


                }
            }
        })
    }


    /**
     * 根据卡号查询卡信息
     * @param bankCardNo
     * @param username
     */
    function bankcardBind(bankCardNo, username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BANKCARD_BIND.URL,
            type: PAYMENT_SITE_URL.BANKCARD_BIND.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                bankCardNo: bankCardNo,
                username: username,
            },
            success: function (data) {

            }
        })
    }

    /**
     * 银行卡列表
     * @param username
     */
    function getBankList(username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BANK_LIST.URL,
            type: PAYMENT_SITE_URL.BANK_LIST.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                username: username,
            },
            success: function (data) {
                // console.log(data);
                if (data.authStatus == '200') {
                    require.async("handlebars", function () {
                        require.async("transCommonPay", function () {
                            var tpl = require('/layout/payment/bankList.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#bankList").html(html);
                        });
                    });
                }


            }
        })
    }


    /**
     * 绑定银行卡并支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param app_request
     * @param bankCardType
     * @param bankCode
     * @param bankCardNo
     * @param cardType
     * @param cardNum
     * @param phoneNum
     * @param verificationCode
     * @param expiryDate
     * @param verifyCode
     * @param username
     * @param bankName
     */
    function boundCardPay(isBalancePay, type, paymentPluginId, mergeSn, amount, app_request, bankCardType, bankCode, bankCardNo, cardType, cardNum, phoneNum, verificationCode, expiryDate, verifyCode, username, bankName) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BOUND_CARD_PAY.URL,
            type: PAYMENT_SITE_URL.BOUND_CARD_PAY.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                app_request: app_request,
                bankCardType: bankCardType,
                bankCode: bankCode,
                bankCardNo: bankCardNo,
                cardType: cardType,
                cardNum: cardNum,
                phoneNum: phoneNum,
                verificationCode: verificationCode,
                expiryDate: expiryDate,
                verifyCode: verifyCode,
                username: username,
                bankName: bankName
            },
            success: function (data) {
                // console.log(data);
            }
        })
    }


    /**
     * 快捷支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param cardId
     * @param app_request
     * @param username
     */
    function paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.PAY_SUBMIT.URL,
            type: PAYMENT_SITE_URL.PAY_SUBMIT.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: 2017051735685,
                amount: amount,
                cardId: cardId,
                app_request: app_request,
                username: username,
            },
            success: function (data) {
                if (data.parameterMap) {
                    store.set("req_data", data.parameterMap.req_data);
                    if (data.authStatus == '200') {
                        return location.href = '../sendMoney.html';
                    }
                }
                $.toast(data.authMsg);
            }
        })
    }

    //确认支付
    function initSureSubmit() {

        $("#surePays").click(function () {
            var $ticks = $("#payWay").find(".card").find(".tick");
            var $selectedTick = $ticks.filter(".tickSelected");
            var value = $selectedTick.attr("data-value");
            if (isBalancePay == false) {
                if (balance < allAmount && $selectedTick.length == 0) {
                    $.toast("余额不足，请选择支付方式");
                } else if (balance < allAmount && $selectedTick.length > 0 && value == "lianlianpayPlugin") {
                    tankuang();
                } else {
                    $.toast("暂不支持该支付方式");
                }
            } else {
                if ($selectedTick.length > 0) {
                    if (value == "lianlianpayPlugin") {
                        tankuang();
                    } else {
                        $.toast("暂不支持该支付方式");
                    }

                } else {
                    $.toast("请选择一种支付方式");
                }
            }
        });

    }

    //弹框
    function tankuang() {
        var $bankList = $("#bankList").find(".bankMask .cont").html();
        $.modal({
            title: '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
            afterText: $bankList,
            buttons: [{
                text: '<div class="bank-but"><a href="javascript:;" class="external but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                onClick: function () {
                    window.location.href = "../payment.html";
                }
            }]
        });
        $(".modal-buttons").addClass("bank-but-radius");
        $(".cancel-m").click(function () {
            $(".modal").css({display: "none"});
            $.closeModal();
        });
    }

    //选择或添加银行卡
    function checkBank() {

        var $checkPayList = $("#payWay").find(".card").find(".checkPay");
        $checkPayList.each(function (index, item) {
            $(this).click(function () {
                var $idName = $(this).attr("id");
                if ($idName == "lianlianpayPlugin") {
                    var $bankList = $("#bankList").find(".bankMask .cont").html();
                    $.modal({
                        title: '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
                        afterText: $bankList,
                        buttons: [{
                            text: '<div class="bank-but"><a href="javascript:;" class="external but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                            onClick: function () {
                                window.location.href = "../payment.html";
                            }
                        }]
                    });
                    $(".modal-buttons").addClass("bank-but-radius");
                    $(".cancel-m").click(function () {
                        $(".modal").css({display: "none"});
                        $.closeModal();
                    });

                } else {
                    $.toast("暂不支持该支付方式");
                }

            })
        });
    }

    //选择支付方式
    function choicePay() {
        $(".checkPay").each(function (index, item) {
            $(this).click(function () {
                if (!$(this).find(".tickys").hasClass("tickSelected")) {
                    $(this).find(".tickys").addClass("tickSelected").parents().siblings().find(".tickys").removeClass("tickSelected").addClass("tick");
                    $(this).find(".morePay").css({visibility: "visible"}).parents().siblings().find(".morePay").css({visibility: "hidden"});
                } else {
                    $(this).find(".tickys").removeClass("tickSelected");
                    $(this).find(".morePay").css({visibility: "hidden"});
                }
            })
        })
    }

})
