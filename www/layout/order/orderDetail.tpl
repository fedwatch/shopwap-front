{{#each this.orders}}
    <div class="orderDetailHeader list-block">
        <div class="pull-left">
            <img src="{{bizSupplierInfo.logo}}" style="width:20px;height:20px;"/>
            <span class="storeName" >{{bizSupplierInfo.shopName}}</span>
        </div>
        <span class="tradeStatus pull-right"></span>
    </div>
    {{#each orderItems}}
    <div class="detail-content list-block">
        <div class="order-item" >
            <div class="order-item-img" >
                <img src="{{product.image}}" >
            </div>
            <div class="order-item-desc" >
                <h2 class="desc-title" >{{name}}</h2>
                <span class="desc-content" >{{product.specificationsDescription}}</span>
            </div>
            <div class="order-item-price">
                <span class="nowPrice">￥{{price}}</span><br>
                <del class="pastPrice" style="color:#999999;">￥{{product.price}}</del><br>
                x <span class="quant">{{quantity}}</span>
            </div>
        </div>
    </div>
    {{/each}}

    <div class="orderDetailAddons list-block">
        <div class="shipping-method fs8 detail-item-content" >
            <div class=" pull-left">配送方式</div>
            <div class="shipping-cost pull-right">快递：<span>￥<span> {{freight}}</span></span></div>
        </div>
        <!--<div class="detail-coupon fs8 detail-item-content" >-->
            <!--<div class=" pull-left">优惠券</div>-->
            <!--<div class=" pull-right"><span>10</span>元</div>-->
        <!--</div>-->
        <div class="seller-msg fs8 detail-item-content" >
            <div class=" pull-left">卖家留言</div>
            <div class=" pull-right">{{memo}}</div>
        </div>
        <div class="item-inner">
            <div >&nbsp;</div>
            <div  class="jin-e">
                <span class="buy-amount">共<span>{{orderItemsSize}}</span>件商品<span class="summation">合计：</span></span>
                <span class="dollar">￥</span>
                <span class="int-part">{{amountPaid}}</span>.<span class="small-part">00</span>
            </div>
        </div>
    </div>
{{/each}}


