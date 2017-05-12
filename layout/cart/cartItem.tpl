
{{#each cartItems}}
<div class="cart-item">
    <div class="cart-store-title-label">
        <div class="cart-store-title-wrapper" >
            <input type="checkbox"  class="cart-shop-select" id="cartSelect-{{storeId}}">
            <label for="cartSelect-{{storeId}}"></label>
        </div>
        <span class="pull-left storeName">
            <i class="icon icon-store-icon"></i>
            <span id="storeName">{{storeName}}</span>
        </span>
        <span class="pull-right editBtn"> 编辑 </span>
        <span class="pull-right finishBtn"> 完成 </span>
    </div>

        <!--正常商品显示-->
        <div class="cart-store-img-text-label">
            <div class="cart-item-select-wrapper" >
                <input type="checkbox" class="cart-list-select"  id="cartSelect-{{productId}}">
                <label for="cartSelect-{{productId}}"></label>
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
                    {{productDescription}}
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
                                <!--{{productDescription}}-->
                            </span>
                    </div>
                </div>

                <div class="panel-remove-btn">
                    <span> 删除 </span>
                </div>
            </div>


        </div>


</div>
{{/each}}
