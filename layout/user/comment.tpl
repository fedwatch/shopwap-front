<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class="title">用户评价</h1>
</header>
<div class="content comment infinite-scroll"   data-distance="100">
    <div class="comment-content">
        <div class="card-header comment-header">
            <div class="clearfix">
               <div class="pull-left"><span class="satisf">商品满意度：</span></div>
                <ul class="pull-left">
                    <li  class="evaluate" id="1"></li>
                    <li  class="evaluate" id="2"></li>
                    <li  class="evaluate" id="3"></li>
                    <li  class="evaluate" id="4"></li>
                    <li  class="evaluate" id="5"></li>
                </ul>
            </div>
        </div>
        <div class="c-title">评价详情</div>
        <ul class="comment-list list-container">


        </ul>
    </div>
    <div class="footer" style="display:none;">
        <i class="line"></i>
        <a href="javascript:;" class="more">无更多评价</a>
        <i class="line"></i>
    </div>
    <!-----placeholder--->
    <div class="infinite-scroll-preloader" >
        <div class="preloader"></div>
    </div>
</div>
<script>
    var loading = false;
    var maxItems = 40;

    var itemsPerLoad = 20;
    function addItems(number, lastIndex) {
        var html = '';
        for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
           // html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
            html+='<li class="list-list"> <div class="user-con clearfix"> <img src="../../assets/images/user.png"/> <span class="c-user">{{id}}</span> <span class="c-date">{{date}}</span> <span class="finger pull-right"><img src="../../assets/images/finger-down.png"/></span> </div> <div class="card-content"> <div class=" c-re-con">{{text}}</div> </div></li>'
        }
        $('.comment-list').append(html);

    }
    addItems(itemsPerLoad, 0);

    var lastIndex = 20;

    $(document).on('infinite', '.infinite-scroll',function() {
        // 如果正在加载，则退出
        if (loading) return;

        // 设置flag
        loading = true;

        setTimeout(function() {
            loading = false;

            if (lastIndex >= maxItems) {
                $.detachInfiniteScroll($('.infinite-scroll'));
                $('.infinite-scroll-preloader').remove();
                $(".footer").css({display:"block"});
                return;
            }
            addItems(itemsPerLoad, lastIndex);
            lastIndex = $('.list-container li').length;
        }, 1000);

    });
</script>
<script>
    var data={length:4};
function totalStar(num){
    var eachStarLen=$(".comment-header").find("li").outerWidth();
    var ceilNum=Math.ceil(num);
    var intNum=parseInt(num);
    var remainder=num-intNum;
    var html='<div class="eval-con"><span  class="eval-offset"></span></div>';
    $(".evaluate").each(function(index,item){
        for(var i=0;i<=intNum-1;i++){
            if(index==i){
                $(this).html(html);
            }
        }
    });
    if(remainder!=0){
        $(".evaluate").eq(ceilNum-1).html(html);
        var realWidth=eachStarLen*remainder+"px";
        $(".eval-con").eq(ceilNum-1).css({width:realWidth});
    }
}
//调用
totalStar(data.length);
</script>
