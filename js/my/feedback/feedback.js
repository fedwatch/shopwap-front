/**
 * Created by Administrator on 2017/3/10.
 * @module 意见反馈
 * @description
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('mockjs');
    require('light7');

    $(function () {
        //意见反馈提交按钮
        var $feedbackSubmitBtn = $("#feedbackSubmitBtn");
        var $feedbackContent = $("#feedbackContent");


        var data = Mock.mock(/\/postToFeedback$/, {
            'listResult|10': [{
                'id|+1': 1,
                'email': '@EMAIL',
            }]
        });


        $feedbackSubmitBtn.on('click',function () {
            var formData = $feedbackContent.serializeArray();
            var val = $feedbackContent.val();
            var length = $feedbackContent.val().length;
            if (typeof val == 'undefined' || typeof val == '' || length < 15){
                $.toast("您输入的反馈意见字数过短，请重新输入！");
                return;
            }
            var data = Mock.mock(/\/postToFeedback$/, {
                'result|1': [{
                    'id|+1': 1,
                    'status':'反馈成功'
                    // 'email': '@EMAIL',
                }]
            });
            $.ajax({
                url:'/postToFeedback',
                type:'post',
                dataType:'json',
                data:formData,
                success:function (data) {
                    var data = data['result'];
                    console.log(data.status);
                    // feedback
                    require.async('handlebars',function(){
                        $("#feedbackPage").empty();
                        var data = {};
                        var tpl = require('/layout/my/feedbackSuccess.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#feedbackPage").html(html);
                    });
                }
            })
        });

        //
        // var $fbSuccessSubmitBtn = $("#fbSuccessSubmitBtn");
        // $fbSuccessSubmitBtn.on('click',function () {
        //     location.href = '';
        // })


    });

    // feedback
    require.async('handlebars',function(){
        var data = {

        };
        var tpl = require('/layout/my/feedback.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#feedbackPage").html(html);
    });

});
