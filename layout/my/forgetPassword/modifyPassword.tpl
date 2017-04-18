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
        <img src="/assets/images/logo.png" alt="" class="logo_block" style="width: 8rem;margin: 3rem 0 .2rem 0;">
    </div>
    <div class="list-block" style="padding:0 .7rem">
        <ul style="background: transparent!important;border-top:0;border-bottom:0;">

            <!-- Text inputs -->
            <li class="register_input ">

                <div class="item-content">
                    <div class="item-media"><i class="icon icon-forget-password"></i></div>
                    <div class="item-inner" style="border-bottom: 0; ">
                        <!--<div class="item-title label"></div>-->
                        <div class="item-input">
                            <input type="password" placeholder="请输入登录密码" id="userPassword1" minlength="8" maxlength="16">
                        </div>
                    </div>
                </div>
            </li>
            <p  id="userPassword1Error">您输入的登录密码有误，请重新输入！</p>

            <li class="register_input ">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-forget-password"></i></div>
                    <div class="item-inner" style=" ">
                        <!--<div class="item-title label"></div>-->
                        <div class="item-input">
                            <input type="password" placeholder="请再次输入密码" id="userPassword2" minlength="8" maxlength="16">
                        </div>
                    </div>
                </div>
            </li>
            <p  id="userPassword2Error">您两个输入的密码不一致！</p>
        </ul>
    </div>
    <div class="content-block">
        <div class="row">
            <div class="col-100">
                <a href="javascript:;" class="button button-big" id="registerBtn" style="border:0;color:#fff;background:#f84b15;border-radius: 4rem">
                    确认重置
                </a>
            </div>
        </div>
    </div>
</div>

