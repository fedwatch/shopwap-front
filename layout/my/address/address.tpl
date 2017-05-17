<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>地址管理</h1>
</header>
{{receivers}}
{{#if receivers}}
<div class="content manage-address">
    {{#each receivers}}
    <div class="address-list" id="{{id}}">
        <div class="ad-list">
            <div class="ad-title clearfix">
                <span class="manage">{{username}}</span>
                <span class="phone">{{phoneNum}}</span>
                <span class="default-address pull-right">默认地址</span>
            </div>
            <div class="address-text">
                {{address}}
            </div>
            <div class="address-operate">
                <div class="operate clearfix">
                    <div class="delete pull-right">删除</div>
                    <div class="edit-op pull-right">编辑</div>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</div>
{{else}}
<div class="content">
    <div class="content-block">
        <div class="tip-img"><img src="../../../assets/images/address.png"/></div>
        <div class="address-w">收货地址在哪里</div>
    </div>
</div>
{{/if}}


<nav class="bar bar-tab">
    <div class="address-bottom">
        <a href="./add-address.html" class="external address-button"  >添加新地址</a>
    </div>
</nav>
