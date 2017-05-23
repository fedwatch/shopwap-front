<!--注册-->
<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>找回密码</h1>
</header>
<div class="content">
    <div class="list-block text-center">
        <img src="../../../assets/images/logo.png" alt="" class="logo_block" style="width: 8rem;margin: 3rem 0 .2rem 0;">
    </div>
    <div class="list-block" style="padding:0 .7rem">
        <ul style="background: transparent!important;border-top:0;border-bottom:0;">

            <!-- Text inputs -->
            <li class="register_input ">

                <div class="item-content">
                    <div class="item-media"><i class="icon icon-register-userphone"></i></div>
                    <div class="item-inner" style="border-bottom: 0; ">
                        <!--<div class="item-title label"></div>-->
                        <div class="item-input">
                            <input type="text" placeholder="请输入您的手机号" id="userPhone" maxlength="11">
                        </div>
                    </div>
                </div>
            </li>
            <p  id="userPhoneError">您输入的手机号码有误，请重新输入！</p>

            <li class="register_input ">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-register-sms"></i></div>
                    <div  style="display: inline-flex">
                        <div class="col-50" style="padding-left:.8rem;">
                            <input type="text" placeholder="验证码" maxlength="6" id="smsCode">
                        </div>
                        <div class="col-50">
                            <button class="button button-big" id="getSMSCodeBtn" style="
                            width: 5.24rem;
                            background:#ffdf0b;
                            border:0;
                            color:#515151;
                            border-top-left-radius: 0;
                            border-top-right-radius: 2rem;
                            border-bottom-right-radius: 2rem;
                            border-bottom-left-radius: 0;">
                                获取验证码
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            <p  id="userSMSCodeError">您输入的验证码有误，请重新输入！</p>
        </ul>
    </div>
    <div class="content-block">
        <div class="row">
            <div class="col-100">
                <a href="javascript:;" class="button button-big" id="registerBtn" style="border:0;color:#fff;background:#f84b15;border-radius: 4rem">
                    下一步
                </a>
            </div>
        </div>
    </div>
</div>