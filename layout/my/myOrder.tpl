<!--我的订单-->
<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>我的订单</h1>
</header>

<div class="content">
    <div class="orderColumn">
        <div class="row text-center ">
            <div class="col-20 ocItem all"  >
                全部
            </div>
            <div class="col-20 ocItem unconfirmed" >
                待付款
            </div>
            <div class="col-20 ocItem confirmed" >
                待发货
            </div>
            <div class="col-20 ocItem shipped" >
                待收货
            </div>
            <div class="col-20 ocItem completed" >
                待评价
            </div>
        </div>
    </div>


    <div id="getListOrders" class="myOrderList list-block">
        {{#if orders}}
            {{#each orders}}
            <div class="cart-item">
                <div class="cart-store-title-label">
                    <span class="pull-left storeName"><i class="icon icon-store-icon"></i> {{this.bizSupplierInfo.shopName}}</span>
                    <span class="pull-right tradeStatus"> {{transOrderStatus this.orderStatus}} </span>
                </div>
                {{#each orderItems}}
                <div class="cart-store-img-text-label">
                    <div class="cart-item-image">
                        <img src="{{this.thumbnail}}" alt="" style="">
                    </div>
                    <div class="cart-item-text">
                        <div class="row">
                            <div class="col-66">
                                <h2 class="cart-item-buying-title">{{this.fullName}}</h2>
                                <span class="cart-item-buying-desc">{{this.product.specificationValues.description}}</span>
                            </div>

                            <div class="priceWrapper col-33" >
                                <span class="nowPrice">￥ {{this.product.price}}</span><br>
                                <del class="pastPrice">￥ {{this.product.marketPrice}}</del>
                                <br>
                                <span>x <span class="quant">{{quantity}}</span></span>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="totalBox">
                    共 <span class="totalQuant">{{this.quantity}}</span> 件商品 合计：￥<span class="totalPrice">{{this.subtotal}}</span> (含运费 ￥<span class="logPrice">{{this.freight}}</span>)
                </div>
                {{/each}}


                <div class="userChooseCol" >

                    {{#compare this.orderStatus 'shipped'}}
                    <a href="/html/user/logistics.html" class="external checkLogBtn uccButton"> 查看物流 </a>
                    <span class="confirmReceiptBtn uccButton"> 确认收货 </span>
                    {{/compare}}

                    {{#compare this.orderStatus 'completed'}}
                    <a href="/html/user/logistics.html" class="external checkLogBtn uccButton"> 查看物流 </a>
                    <a href="/html/user/review.html" class="external commentBtn uccButton"> 评价 </a>
                    {{/compare}}

                    {{#compare this.orderStatus 'unconfirmed'}}
                    <a href="../../payment/alipay/commonPay.html" class="external paymentBtn uccButton" > 立即付款 </a>
                    {{/compare}}

                    {{#compare this.orderStatus 'confirmed'}}
                    <a href="javascript:void(0);" class="waitSendBtn uccButton"> 等待卖家发货 </a>
                    {{/compare}}

                    {{#compare this.orderStatus 'closed'}}
                    <a href="javascript:void(0);" class="waitSendBtn uccButton"> 交易关闭 </a>
                    {{/compare}}
                    {{#compare this.orderStatus 'expired'}}
                    {{/compare}}
                </div>




            </div>
            {{/each}}
        {{else}}

        {{/if}}
    </div>
</div>
