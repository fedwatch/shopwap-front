<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:;" external="false" data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>修改登录密码</h1>
</header>
<div class="content">
    <div class="list-block change-mar">
        <ul>
            <!-- Text inputs -->
            <li>

                <div class="item-content">
                    <div class="item-media">新&nbsp;&nbsp;密&nbsp;&nbsp;码</div>
                    <div class="item-inner item-vert">
                        <!--<div class="item-title label"></div>-->
                        <div class="item-input item-phone">
                            <input type="text" placeholder="请输入您的手机号" id="userPhone" maxlength="11">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <p  id="userPhoneError" class="danger">您输入的手机号码有误，请重新输入！</p>
                <div class="item-content">
                    <div class="item-media">确认密码</div>
                    <div class="item-inner item-vert">
                        <!--<div class="item-title label"></div>-->
                        <div class="item-input item-phone">
                            <input type="text" placeholder="请输入您的手机号"  maxlength="11">
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="content-block">
                    <div class="row">
                        <div class="col-100">
                            <a href="./changePasswordSuccess.html" class="external button button-big button-password rg-col" >下一步</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

<li>
    <p  id="userPassError" class="danger">您输入的登录密码有误，请重新输入！</p>
    <div class="item-content">
        <!--<div class="item-media"><i class="icon icon-form-email"></i></div>-->
        <div class="item-inner">
            <!--<div class="item-title label"></div>-->
            <div class="item-input">
                <input type="password" placeholder="请输入登录密码" id="userPass">
            </div>
        </div>
    </div>
</li>