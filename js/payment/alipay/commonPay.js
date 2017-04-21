define(function(require,exports,module){
    require("jquery");
    require("light7");
    require("mockjs");
    $(function(){
       var $logoThree=$("#logo3");
       var $mainContent=$(".bankMask").find(".cont").html();
        $logoThree.on('click', function () {
            $.modal({
                title:  '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
                afterText:$mainContent,
               buttons:[{
                   text: '<div class="bank-but"><a href="javascript:;" class="but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
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
    });

    require.async("handlebars",function(){
        var data={};
        var tpl=require('/layout/payment/alipay/commonPay.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#commonPay").html(html);
    })
})
