<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:void(0)" external="false" data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>修改登录密码</h1>
</header>

<div class="content">
    <div class="list-block change-mar">
        <ul>
            <li>
                <p  id="userPassError" class="danger">您输入的登录密码有误，请重新输入！</p>
                <div class="item-content">
                    <div class="item-media">旧&nbsp;&nbsp;密&nbsp;&nbsp;码</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="password" placeholder="请输入旧密码" id="old-userPassword">
                           <!--- <span id="hidden1"> <input type="text" placeholder="请输入旧密码" ></span>--->
                        </div>
                        <div class="item-title label"><i class="com-icon icon-p-2"></i></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media">新&nbsp;&nbsp;密&nbsp;&nbsp;码</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="password" placeholder="请输入新密码" id="new-password"  minlength="6"    maxLength="16">
                            <!--- <span id="hidden2"> <input type="text" placeholder="请输入新密码" ></span>--->
                        </div>
                        <div class="item-title label"><i class="com-icon icon-p-2"></i></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                   <div class="item-media">确认密码</div>
                    <div class="item-inner">
                        <div class="item-input">
                            <input type="password" placeholder="请再次输入新密码" id="new-password-two" >
                            <!---<span id="hidden3"> <input type="text" placeholder="请再次输入新密码" ></span>-->
                        </div>
                        <div class="item-title label"><i class="com-icon icon-p-2"></i></div>
                    </div>
                </div>
            </li>
            <li>
                <div class="content-block">
                    <div class="row">
                        <!--<div class="col-50"><a href="#" class="button button-big button-fill button-danger">Cancel</a></div>-->
                        <div class="col-100">
                            <a href="javascript:;" class="external button button-big rg-col next-step">下一步</a>
                        </div>
                        <!--<div class="col-50"><a href="#" class="button button-big button-fill button-success">Submit</a></div>-->
                    </div>
                </div>
            </li>
        </ul>

    </div>
</div>
