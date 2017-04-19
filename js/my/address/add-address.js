define(function(require,exports,module){
    require('jquery');
    require('light7');
    require('swipeout');
    require('city-swiper');
    $(function(){
        $(document).on("pageInit", function() {
            $("#city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">OK</button>\
            <h1 class="title">choose address</h1>\
            </header>'
            });
        });
        $.init();
    });
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/address/add-address.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#add-address").html(html);
    });
})
