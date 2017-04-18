<!--优惠券管理-->
<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>优惠券管理</h1>
</header>

<div class="content">
    <div class="content-block-title coupon-category-title">
        <a class="coupon-category active"></a>
        <a class="coupon-category"></a>
    </div>
    <div class="content-block">
        <div class="rs">
            <div class=" buttons-row">
                <a href="#tab1" class="tab-link button active">{{title.title1}}</a>
                <a href="#tab2" class="tab-link button">{{title.title2}}</a>
                <a href="#tab3" class="tab-link button">{{title.title3}}</a>
            </div>
        </div>

    </div>
    <div class="list-block coupon-list tabs">
        <div   id="tab1" class="tab active">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id1}}</div>
                        <div class="item-after">{{context.text.text1}}</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id1}}</div>
                        <div class="item-after">{{context.text.text1}}</div>
                    </div>
                </li>
                <li class="item-link ">
                    更多优惠
                </li>
            </ul>
        </div>
        <div   id="tab2" class="tab ">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id2}}</div>
                        <div class="item-after">{{context.text.text2}}</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id2}}</div>
                        <div class="item-after">{{context.text.text2}}</div>
                    </div>
                </li>
                <li class="item-link ">
                    更多优惠
                </li>
            </ul>
        </div>
        <div   id="tab3" class="tab ">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id3}}</div>
                        <div class="item-after">{{context.text.text3}}</div>
                    </div>
                </li>
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{context.date.id3}}</div>
                        <div class="item-after">{{context.text.text3}}</div>
                    </div>
                </li>
                <li class="item-link ">
                    更多优惠
                </li>
            </ul>
        </div>
    </div>
</div>

