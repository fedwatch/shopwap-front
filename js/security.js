/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require("swiper");

    $(function () {

    });

    // shopListSort
    require.async('handlebars',function(){
        var data = {
            data:'738951'
        };
        var tpl = require('/layout/shopList/shopListSort.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#shopListSort").html(html);
    });
});
