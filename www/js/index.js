/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){


    // footerNav
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/zqVue/shopwap-front/www/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#").html(html);
    });

});
