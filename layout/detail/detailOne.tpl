<!--产品名称、价格、运费、发货地-->
<div class="detail-content list-block" style="background: #fff;padding-top:.5rem;">
    <div class="product-title-box" >
        <!--<h1 class="product-title" id="productName"></h1>-->
        <h1 class="product-title">{{this.productName}}</h1>
    </div>

    <div class="product-price-box" >
        <span>￥<span id="productPrice">{{this.productPrice}}</span></span>
    </div>
    <div class="shopping-cost detail-item-content" >
        <!--运费-->
        <div class="shipping-cost-box pull-left" >
            <span>运费：<span id="shippingCost">{{this.shippingCost}}</span>元</span>
        </div>
        <!--发货地-->
        <div class="seller-location pull-right" id="productPlace">{{this.productPlace}}</div>
    </div>
    <div id="cartIndex" style="background: #fff"></div>
</div>