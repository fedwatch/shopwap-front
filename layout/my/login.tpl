<!--用户登录-->
<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>用户登录</h1>
</header>
<div class="content">
    <div class="list-block text-center">
        <img src="/assets/images/logo.png" alt="" class="logo_block" style="width: 8rem;margin: 3rem 0 .2rem 0;">
    </div>
    <div class="list-block" style="padding:0 2rem;">
        <ul style="background: transparent!important;border-top:0;border-bottom:0;">
            <li class="login_input">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-userphone"></i></div>
                    <div class="item-inner" style="border-bottom: 0;">
                        <div class="item-input">
                            <input id="userPhone" type="text" placeholder="手机号" style="font-size:1.0rem;color:#333;">
                        </div>
                    </div>
                </div>
            </li>
            <li class="login_input">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-userpass"></i></div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input id="userPass" type="password" placeholder="密码">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="content-block" style="padding:0 2rem;">
        <a id="loginBtn" class="button button-big  external "
           style="background: linear-gradient(0,#ee4e15,#ff6a10);color:#fff;border:0;border-radius: 5rem;" href="javascript:void(0)"
           data-transition="fade">
            登录
        </a>
        <p class="text-center signup">
            <a href="/html/my/register/register.html" class="pull-left external" style="color:#fff;margin-left:3rem;">立即注册</a>
            <span style="color:#fff;">|</span>
            <a href="/html/my/forgetPassword/forgetPassword.html" class="pull-right external" style="color:#fff;margin-right:3rem;">忘记密码</a>
        </p>
    </div>
</div>
