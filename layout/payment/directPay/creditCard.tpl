<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>快捷支付</h1>
</header>
<div class="content creditCard">

    <div class="pay-money">
        <div class="item-media">支付金额：</div>
        <div class="item-inner"> <span>1777</span> 元</div>
    </div>

    <div class="list-block ">
        <ul class="list-tab">



            <li>
                <div class="item-content">
                    <div class="item-media">卡&nbsp;&nbsp;类&nbsp;&nbsp;型</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" value="{{transBankCardType memberBank.bankCardType}}">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">银行卡号</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" value="{{memberBank.bankCardNo}}" autocomplete="off">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">发&nbsp;&nbsp;卡&nbsp;&nbsp;行</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" autocomplete="off" value="{{memberBank.bankName}}">
                        </div>
                    </div>
                </div>
            </li>
            {{#equals memberBank.bankCardType 'blue'}}
            <!-- 信用卡 start -->
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-media">有&nbsp;&nbsp;效&nbsp;&nbsp;期</div>
                    <div class="item-inner" style="border:none;">
                        <div class="item-input">
                            <select name="creditMonth" id="creditMonth" class="creditMonth">
                                <option value="" selected>请选择</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <span>∨</span> 月
                            <select name="creditYear" id="creditYear" class="creditMonth">
                                <option value="" selected>请选择</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                            <span>∨</span>年
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">卡安全码</div>
                    <div class="item-inner verification">
                        <div class="item-input">
                            <input type="text" placeholder="" id="verificationCode">
                        </div>
                    </div>
                    <div class="item-media tab-item mat-tips">卡背面3位数字</div>
                </div>
            </li>
            <!-- 信用卡 end -->
            {{else}}



            {{/equals}}

            <li>
                <div class="item-content">
                    <div class="item-media">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" id="trueUsername"  autocomplete="off">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">身&nbsp;&nbsp;份&nbsp;&nbsp;证</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" id="cardNum" autocomplete="off">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">手&nbsp;&nbsp;机&nbsp;&nbsp;号</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="text" placeholder="" value="{{memberBank.member.username}}" autocomplete="off">
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div class="item-content">
                    <div class="item-media">验&nbsp;&nbsp;证&nbsp;&nbsp;码</div>
                    <div class="item-inner verification">
                        <div class="item-input">
                            <input type="text" placeholder="" autocomplete="off" id="verifyCode">
                        </div>
                    </div>
                    <div class="item-media tab-item mat-tips vert verBtn">获取验证码</div>
                </div>
            </li>

        </ul>
        <div class="credit-button"><a href="javascript:void(0)" class="firstBind external button button-big button-fill button-success">确认开通并支付</a></div>
    </div>

</div>