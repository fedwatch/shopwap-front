
{{#each carts}}
<div class="cart-item">
    <div class="cart-store-title-label">
        <div class="cart-store-title-wrapper" >
            <input type="checkbox"  class="cart-shop-select" id="cartSelect-{{id}}">
            <label for="cartSelect-{{id}}"></label>
        </div>
        <span class="pull-left storeName">
            <i class="icon icon-store-icon"></i>
            <span id="storeName">{{name}}</span>
        </span>
        <span class="pull-right editBtn"> 编辑 </span>
        <span class="pull-right finishBtn"> 完成 </span>
    </div>
    {{#each cartItems}}
        {{#if isMarketable}}
            <!--正常商品显示-->
            <div class="cart-store-img-text-label">
                <div class="cart-item-select-wrapper" >
                    <input type="checkbox" class="cart-list-select"  id="cartSelect-{{id}}">
                    <label for="cartSelect-{{id}}"></label>
                </div>
                <div class="cart-item-image">
                    <a href="" class="external">
                        {{#if image}}
                        <img src="{{image}}" alt="">
                        {{else}}
                        <img src="http://www.962.net/up/2014-9/14119787066757765.jpg" alt="">
                        {{/if}}
                    </a>
                </div>
                <div class="cart-item-text">
                    <h2 class="cart-item-buying-title">{{productName}}</h2>
                    <span class="cart-item-buying-desc">
                        {{specificationsName}}
                    </span>
                    <div class="cart-item-display-flex" >
                        <div class="cart-item-price-box psu pull-left">
                            <span style="">￥</span>
                            <span class="sign-number ">
                                {{price}}
                            </span>
                            <!--.-->
                            <!--<span class="deci-number">00</span>-->
                        </div>
                        <div class="cart-item-quantity pull-right">
                            <span class="quantity-symbol">X</span>
                            <span class="quantity-ct">
                                {{quantity}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="cart-item-edit-panel" >
                    <div class="panel-plus-minus">
                        <div class="panel-plus-minus-wrapper">
                                <span class="panel-plus-button panelAddBtn">
                                    <i class="icon icon-panel-plus"></i>
                                </span>
                            <input type="text" class="panel-text-input" value="1">
                            <span class="panel-minus-button panelMinusBtn">
                                    <i class="icon icon-panel-minus"></i>
                                </span>
                        </div>
                        <div class="cart-item-buying-desc">
                                <span>
                                    {{specificationsName}}
                                </span>
                        </div>
                    </div>

                    <div class="panel-remove-btn">
                        <span> 删除 </span>
                    </div>
                </div>


            </div>
        {{else}}
            <div class="offEditPanel">
                <div class="row">
                    <div class="col-50">
                        <a href="javascript:void(0);" class="button button-light cancelOffItem">取消</a>
                    </div>
                    <div class="col-50">
                        <a href="javascript:void(0);" class="button button-danger removeOffItem">删除</a>
                    </div>
                </div>
            </div>
            <!--失效商品显示-->
            <div class="cart-off-store-img-text-label">
                <div class="cart-item-unselect-wrapper" >
                    <span class="unactive-cart-item">失效</span>
                </div>
                <div class="cart-item-image">
                    <a href="/html/detail/detail.html" class="external">
                        <img src="/assets/images/cart-item-image-product.png" alt="">
                    </a>
                </div>
                <div class="cart-unselect-item-text" style="width: 100%;">
                    <h2 class="cart-item-buying-title">{{productName}}</h2>
                    <span class="cart-item-buying-desc">{{specificationsName}}</span>
                    <div class="cart-unselect-item-display-flex">
                        <div class="cart-item-price-box  pull-left">
                            <span style="">￥</span>
                            <span class="sign-number ">{{productPrice}}</span>
                            <!--.-->
                            <!--<span class="deci-number">00</span>-->
                        </div>
                        <div class="cart-item-off-store pull-right">
                            <span class="off-store-desc">{{transProductState productState}}</span>
                        </div>
                    </div>
                </div>
            </div>
        {{/if}}
    {{/each}}
</div>
{{/each}}
