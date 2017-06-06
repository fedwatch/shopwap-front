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
            <ul class="comment-list list-container">
                {{#each this.reviews}}
                <li class="list-list">
                    <div class="user-con clearfix">
                        <img src="../../assets/images/user.png"/>
                        <span class="c-user">{{member.username}}</span>
                        <span class="c-date">{{createDate}}</span>
                        <span class="finger pull-right">
                           <img src="../../assets/images/finger-down.png"/>
                       </span>
                    </div>
                    <div class="card-content">
                        <div class=" c-re-con">{{content}}</div>
                    </div>
                </li>
                {{/each}}
            </ul>

        </ul>
    </div>
    <div class="footer" style="display:none;">
        <i class="line"></i>
        <a href="javascript:;" class="more">无更多评价</a>
        <i class="line"></i>
    </div>
    <input type="hidden" value="" id="dataScore">
    <!-----placeholder--->
    <div class="infinite-scroll-preloader"  style="display:none;">
        <div class="preloader"></div>
    </div>
</div>
<script>

   /* var loading = false;

    var itemsPerLoad = 10;
    function addItems(number, lastIndex) {
        var html = '';
        for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
            html+='<li class="list-list">' +
                    ' <div class="user-con clearfix"> ' +
                    '<img src="../../assets/images/user.png"/> ' +
                    '<span class="c-user">{{id}}</span> ' +
                    '<span class="c-date">{{date}}</span>' +
                    ' <span class="finger pull-right">' +
                    '<img src="../../assets/images/finger-down.png"/>' +
                    '</span> </div> <div class="card-content"> ' +
                    '<div class=" c-re-con">{{text}}</div>' +
                    ' </div>' +
                '</li>'
        }
        $('.comment-list').append(html);

    }
    addItems(itemsPerLoad, 0);


    var maxItems = 30;
    var lastIndex = 10;

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

    });*/
</script>

