
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
            <a href="javascript:void(0);" class="external checkLogBtn uccButton" data-sn="{{sn}}"> 查看物流 </a>
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
a
{{/if}}


