<!--绑定银行卡 第二步-->
<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>绑定银行卡</h1>
</header>
<div class="content">
    <div class="list-block">
        <div class="item-content">
            <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
            <div class="item-inner text-center">
                <!--<div class="item-title label">用户名</div>-->
                <div class="col-60">
                    <p>
                        支付金额：
                        <i>￥</i> <span>308.00</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="list-block">
        <ul>
            <!-- Text inputs -->
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">卡类型</div>
                        <div class="item-input">
                           <p>借记卡</p>
                        </div>
                    </div>
                </div>
            </li>

            <!-- 类型为 信用卡 时，才出现 Start -->
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">卡类型</div>
                        <div class="item-input">
                            <p>信用卡</p>
                        </div>
                    </div>
                </div>
            </li>
            <!-- 类型为 信用卡 时，才出现 End -->

            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">银行卡号</div>
                        <div class="item-input">
                           <p>6225********8702</p>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">发卡行</div>
                        <div class="item-input">
                           <p>中国银行</p>
                        </div>
                    </div>
                </div>
            </li>

            <!-- 类型为 信用卡 时，才出现 Start -->
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon-user"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">有限期</div>
                        <div class="item-input">
                            <select name="creditMonth" id="creditMonth">
                                <option value="" selected><-- 请选择 --></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            月
                            <select name="creditYear" id="creditYear">
                                <option value="" selected><-- 请选择 --></option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                            年
                        </div>
                    </div>
                </div>
            </li>
            <!-- 类型为 信用卡 时，才出现 End -->

            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">姓名</div>
                        <div class="item-input">
                            <input type="text" placeholder="">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">身份证号</div>
                        <div class="item-input">
                            <input type="text" placeholder="">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">手机号码</div>
                        <div class="item-input">
                            <input type="text" placeholder="">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <!--<div class="item-media"><i class="icon icon"></i></div>-->
                    <div class="item-inner">
                        <div class="item-title label">验证码</div>
                        <div class="item-input">
                            <input type="password" placeholder="" class="col-60 pull-left">
                            <button class="col-40 pull-right">获取验证码</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <div class="content-block">
            <p>
                <a class="button button-big button-fill external" href="javascript:;" data-transition="fade">
                    支付
                </a>
            </p>
        </div>
    </div>
</div>
