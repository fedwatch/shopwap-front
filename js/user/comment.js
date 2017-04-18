define(function(require,exports,module){
    require('jquery');
    require('mockjs');
    var data=Mock.mock("/getData",{
        "id":"13167161025",
        "date":new Date().toLocaleDateString(),
        "text":"一开始担心里面的牛仔那层会有点厚，但是很薄，而且不会透，外面也不会显得很臃肿，非常喜欢。"
    });
    require.async('handlebars',function(){
        $.ajax({
            url:"/getData",
            dataType:"json",
            type:"get",
            success:function(data){
                var tpl=require('/layout/user/comment.tpl');
                var template=Handlebars.compile(tpl);
                var html=template(data);
                $("#comment").html(html);
            }
       })
    });
})