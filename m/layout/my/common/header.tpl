<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class="title">我的街街</h1>
</header>

<div class="content">

    <div class="list-block reset-con">
        <div class="content-block con-b2">
            <div class="user_profile_icon u-p-i2">
                <a href="/m/html/my/personalCenter.html" class="clearfix external">
                    {{#if logo}}
                    <img src="{{logo}}" alt="" class="user_profile_avatar">
                    {{else}}
                    <img src="../../assets/images/customer-photo.jpg" alt="" class="user_profile_avatar">
                    {{/if}}
                </a>
            </div>
            {{#compare this.authStatus '200'}}
            <div>
                <div class="user-id">{{this.username}}</div>
                <div class="rest-money">
                    <span class="reset2-img"></span>
                    <span class="reset2">{{this.balance}}</span>
                    <!--<a class="reset-detail">余额明细</a>-->
                </div>
            </div>
            {{/compare}}

            <!--<div class="login_button_group">-->
                <!--<div class="my-login">-->
                    <!--<a href="/html/my/login/login.html" class="external register-button">登陆</a>-->
                    <!--<a href="/html/my/register/register.html" class="external register-button">注册</a>-->
                    <!--&lt;!&ndash;<a href="javascript:void(0);"  class="external register-button">帐号详情</a>&ndash;&gt;-->
                    <!--&lt;!&ndash;<a href="javascript:void(0);" class="external register-button logoutButton">退出</a>&ndash;&gt;-->
                <!--</div>-->
            <!--</div>-->

        </div>

        <div class="content-block obligation">
            <div>
                <ul class="clearfix">
                    <li style="border-left:none;">
                        待付款
                        <span class="show-amount">{{this.waitingPaymentOrderCount}}</span>
                    </li>
                    <li>
                        待发货
                        <span class="show-amount">{{this.waitingShippingOrderCount}}</span>
                    </li>
                    <li>
                        待收货
                        <span class="show-amount">{{this.waitingReciveOrderCount}}</span>
                    </li>
                    <li>
                        待评价
                        <span class="show-amount">{{this.waitingCommentOrderCount}}</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>

    <div class="list-block" style="margin-bottom:3.5rem;">
        <div class="content-block" style="padding:0;margin:0;">
            <div id="userColumn"></div>
        </div>
    </div>
</div>
