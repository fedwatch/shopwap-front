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



    // feedback
    require.async('handlebars',function(){
        var data = {

        };
        var tpl = require('/layout/my/feedback.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#feedbackPageSuccess").html(html);
    });

});
