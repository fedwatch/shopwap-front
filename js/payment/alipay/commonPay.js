define(function(require,exports,module){
    require("jquery");
    require("light7");
    require("mockjs");
    require("siteUrl");

    $(function(){
       var $logoThree=$("#logo3");
       var $mainContent=$(".bankMask").find(".cont").html();
        $logoThree.on('click', function () {
            $.modal({
                title:  '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
                afterText:$mainContent,
               buttons:[{
                   text: '<div class="bank-but"><a href="javascript:;" class="external but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                   onClick: function() {
                       window.location.href = "../payment.html";
                   }
               }]

            });
          $(".modal-buttons").addClass("bank-but-radius");
          $(".cancel-m").click(function(){
              $(".modal").css({display:"none"});
              $.closeModal();
          });
        });

        $(".checkPay").each(function(index,item){
            $(this).click(function(){
               $(this).find(".tickys").addClass("tickSelected").removeClass("tick").parents().siblings().find(".tickys").removeClass("tickSelected").addClass("tick");
               $(this).find(".morePay").css({visibility:"visible"}).parents().siblings().find(".morePay").css({visibility:"hidden"});
            })
        })
    });


    /**
     * 根据卡号查询卡信息
     * @param bankCardNo
     * @param username
     */
    function bankcardBind(bankCardNo,username){
        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.BANKCARD_BIND.URL,
            type:PAYMENT_SITE_URL.BANKCARD_BIND.METHOD,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            data:{
                bankCardNo:bankCardNo,
                username:username,
            },
            success:function (data) {

            }
        })
    }

    /**
     * 银行卡列表
     * @param username
     */
    function getBankList(username) {
        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.BANK_LIST.URL,
            type:PAYMENT_SITE_URL.BANK_LIST.METHOD,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            data:{
                username:username,
            },
            success:function (data) {

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
    function boundCardPay(isBalancePay ,type ,paymentPluginId ,mergeSn ,amount ,app_request ,bankCardType ,bankCode ,bankCardNo ,cardType ,cardNum ,phoneNum ,verificationCode,expiryDate,verifyCode ,username,bankName){
        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.BOUND_CARD_PAY.URL,
            type:PAYMENT_SITE_URL.BOUND_CARD_PAY.METHOD,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            data:{
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
            success:function (data) {

            }
        })
    }




    require.async("handlebars",function(){
        var data={};
        var tpl=require('/layout/payment/alipay/commonPay.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#commonPay").html(html);
    })
})
