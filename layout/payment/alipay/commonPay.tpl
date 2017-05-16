<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class="title">支付</h1>
</header>

<div class="content">
    <div class="pay-content">
        <div class="title-p clearfix">
            <div class="pull-left order-img">
                <img src="../../../assets/images/ang8.png"/>
            </div>
            <div class="pull-left order-done">
                <div class="or-title">订单提交成功</div>
                <div class="or-title2">请在30分钟之内完成支付</div>
            </div>
        </div>
        <div class="desc-content">
            <div class="pay-amount">
                <span>订单金额：</span>
                <span class="pay-span2">
                    <span class="pay-span3">￥</span>
                    155.
                    <span class="pay-span3">00</span>
                </span>
            </div>
            <div class="order-addr ">
                <span>收货地址：</span>
                <span>刘洋   15900994676</span>
            </div>
            <div class="order-addr">
                <span class="detail-addr">
                    上海市浦东新区浦建路145号强生大厦2709室
                </span>
            </div>
        </div>
    </div>
    <div class="list-block" style="margin:0.75rem 0 0 0;">
        <div class="item-content" style="background-color:#fff;">
            <div class="item-media">余额</div>
            <div class="item-inner" style="border-bottom:none;">
                <div class="item-title label" style="width:auto;">
                    <span style="font-size:0.789rem;">共￥<span>1100.00</span>,使用￥<span>1100.00</span></span>
                </div>
                <div class="item-input" style="width:auto;">
                    <label class="label-switch">
                        <input type="checkbox" id="balancePayBtn">
                        <div class="checkbox"></div>
                    </label>
                </div>
            </div>
        </div>
    </div>


    <div class="pay-way">剩余金额支付方式:</div>
    <div class="list-block cards-list" style="margin-top:0;">
        <ul id="payWay">
            <li class="card">
                <div class="card-header checkPay">
                    <div class="pay-logo1">支付宝</div>
                    <div class="remainPay">
                        <span class="morePay">支付<span style="color:#ff503e;" id="aliPay">455.00</span></span>
                        <span class="tick tickys"></span>
                    </div>
                </div>
                <div class="card-header checkPay">
                    <div class="pay-logo2">微信</div>
                    <div class="remainPay">
                        <span class="morePay">支付<span style="color:#ff503e;" id="wechatPay">455.00</span></span>
                        <span class="tick tickys"></span>
                    </div>
                </div>
                <div class="card-footer checkPay" id="logo3">
                    <div class="pay-logo3">快捷支付</div>
                    <div class="remainPay">
                        <span class="morePay">支付<span style="color:#ff503e;" id="shortcutPay">455.00</span></span>
                        <span class="tick tickys"></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>


<!-----弹框------>
<div id="bankList"></div>

