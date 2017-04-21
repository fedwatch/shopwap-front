define(function(require,exports,module){
    require("jquery");
    require("light7");
    require("mockjs");
    $(function(){
       var $logoThree=$("#logo3");

        $logoThree.on('click', function () {
            $.modal({
                title:  '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
                verticalButtons: true,
                buttons: [
                    {
                        text: '<div class="bank-li"><a href="javascript::" class="external bank-a"><span class="attract">招商银行</span><span>储蓄卡（6479）</span><span class="pull-right arrw">&gt;</span></a></div>',
                        onClick: function() {
                            $.alert('You clicked first button!')
                        }
                    },
                    {
                        text: '<div class="bank-li"><a href="javascript::" class="external bank-a"><span class="attract">招商银行</span><span>储蓄卡（6479）</span><span class="pull-right arrw">&gt;</span></a></div>',
                        onClick: function() {
                            $.alert('You clicked second button!')
                        }
                    },
                    {
                        text: '<div class="bank-li"><a href="javascript::" class="external bank-a"><span class="attract">招商银行</span><span>储蓄卡（6479）</span><span class="pull-right arrw">&gt;</span></a></div>',
                        onClick: function() {
                            $.alert('You clicked third button!')
                        }
                    },
                    {
                        text: '<div class="bank-but"><a href="javascript::" class="external bank-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                        onClick: function() {
                            window.location.href="../payment.html";
                        }
                    }
                ]
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
